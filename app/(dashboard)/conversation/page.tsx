"use client";

import * as z from "zod";
import Heading from "@/components/Heading";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { Message, useForm } from "react-hook-form";
import { formSchema } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import Empty from "@/components/Empty";
import Loader from "@/components/Loader";
import { cn } from "@/lib/utils";
import UserAvatar from "@/components/UserAvatar";
import BotAvatar from "@/components/BotAvatar";
import { useProModal } from "@/hooks/useProModal";

export default function ConversationPage() {
  const { toast } = useToast();

  const router = useRouter();

  const proModal = useProModal();
  const [messages, setMessages] = useState<ChatCompletionMessageParam[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: values.prompt,
      };
      const newMessages = [...messages, userMessage];

      const res = await axios.post("/api/conversation", {
        messages: newMessages,
      });
      setMessages((prev) => [...prev, userMessage, res.data]);
      form.reset();
      toast({
        title: "Success",
      });
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      }
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    } finally {
      router.refresh();
    }
  };

  return (
    <div>
      <Heading
        label="Conversation"
        description="Generate code using descriptive text"
        icon={MessageSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      {...field}
                      className="border-0 outline-none focus-visible:ring-transparent px-2"
                      disabled={isLoading}
                      placeholder="Ask me anything..."
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button className="col-span-12 lg:col-span-2" disabled={isLoading}>
              Generate
            </Button>
          </form>
        </Form>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader />
            </div>
          )}
          {messages.length === 0 && !isLoading && (
            <div>
              <Empty label="No Conversations yet" />
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-2">
            {messages.map((message, i) => (
              <div
                key={i}
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg justify-start",
                  message.role === "user"
                    ? "bg-white border border-black/10 justify-end"
                    : "bg-muted"
                )}
              >
                <div className="text-md font-medium">{message.content}</div>
                {message.role === "user" ? (
                  <UserAvatar />
                ) : (
                  <div className="flex items-center order-first">
                    <BotAvatar />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
