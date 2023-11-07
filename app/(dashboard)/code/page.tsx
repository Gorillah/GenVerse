"use client";

import * as z from "zod";
import Heading from "@/components/Heading";
import { Code, MessageSquare } from "lucide-react";
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
import ReactMarkdown from "react-markdown";
import { useProModal } from "@/hooks/useProModal";

export default function CodePage() {
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
      const res = await axios.post("/api/code", {
        messages: newMessages,
      });
      setMessages((prev) => [...prev, userMessage, res.data]);
      form.reset();
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
        label="Code"
        description="Generate code using descriptive text"
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
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
                      placeholder="Simple toggle button using NextJs"
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
                  "p-4",
                  message.role === "user"
                    ? "bg-white border border-black/10 justify-end"
                    : "bg-muted"
                )}
              >
                <div className="text-md font-medium">
                  <ReactMarkdown
                    components={{
                      pre: ({ node, ...props }) => (
                        <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                          <pre {...props} />
                        </div>
                      ),
                      code: ({ node, ...props }) => (
                        <code
                          className="bg-black/10 p-1 rounded-lg"
                          {...props}
                        />
                      ),
                    }}
                    className={"text-sm overflow-hidden leading-7"}
                  >
                    {message.content || ""}
                  </ReactMarkdown>
                </div>
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
