import React from "react";
import { Button } from "@/components/ui/button";

const Benefits = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 text-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Our Benefits
            </h2>
            <p className="max-w-[900px] text-zinc-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-2xl/relaxed dark:text-zinc-400">
              We provide cutting-edge AI-generated media with numerous
              advantages. Here are a few reasons to use our platform: AI.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
          <div className="flex flex-col justify-center space-y-4">
            <svg
              className=" mx-auto h-10 w-10 mb-4"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <h3 className="text-xl font-bold">Time Savings</h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              Get personalized, customized media in seconds versus hours or
              days. Our AI works instantly to provide media on-demand.
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <svg
              className=" mx-auto h-10 w-10 mb-4"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <h3 className="text-xl font-bold">Cost Effective</h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              Pay only a fraction of the cost compared to hiring creators,
              musicians, videographers or other professionals.
            </p>
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <svg
              className=" mx-auto h-10 w-10 mb-4"
              fill="none"
              height="24"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <h3 className="text-xl font-bold">Easy to Use</h3>
            <p className="text-zinc-500 dark:text-zinc-400">
              Our intuitive platform and clear prompts make it simple for anyone
              to generate high-quality, customized media with AI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
