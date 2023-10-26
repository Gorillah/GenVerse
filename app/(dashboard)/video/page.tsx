"use client";

import * as z from "zod";
import Heading from "@/components/Heading";
import { VideoIcon } from "lucide-react";
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
import { useProModal } from "@/hooks/useProModal";

export default function VideoPage() {
  const { toast } = useToast();

  const router = useRouter();

  const proModal = useProModal();
  const [video, setVideo] = useState<string>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);
      const res = await axios.post("/api/video", values);
      setVideo(res.data[0]);
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
        label="Video Generation"
        description="Turn your prompt into a video"
        icon={VideoIcon}
        iconColor="text-orange-700"
        bgColor="bg-orange-700/10"
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
                      className="border-0 outline-none focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Fish swimming to the ocean."
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
          {!video && !isLoading && (
            <div>
              <Empty label="No Video Generated" />
            </div>
          )}
          {video && (
            <video
              controls
              className="w-full aspect-video mt-8 rounded-lg border"
            >
              <source src={video} type="video/mp4" />
            </video>
          )}
        </div>
      </div>
    </div>
  );
}
