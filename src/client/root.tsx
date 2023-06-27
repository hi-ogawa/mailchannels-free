import { useMutation } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { trpcClient } from "../trpc/client";
import { ReactQueryWrapper, cls } from "./misc";

export function Root() {
  return (
    <React.StrictMode>
      <ReactQueryWrapper>
        <Toaster />
        <RootInner />
      </ReactQueryWrapper>
    </React.StrictMode>
  );
}

function RootInner() {
  return (
    <div className="flex flex-col">
      <header className="sticky top-0 antd-body flex items-center p-2 px-4 gap-4 shadow-md shadow-black/[0.05] dark:shadow-black/[0.7] z-1">
        <div>Mailchannels Demo</div>
        <div className="flex-1"></div>
        <a
          className="antd-btn antd-btn-ghost i-ri-github-line w-5 h-5"
          href="https://github.com/hi-ogawa/mailchannels-free"
          target="_blank"
        ></a>
      </header>
      <div>
        <Content />
      </div>
    </div>
  );
}

function Content() {
  const form = useForm({
    defaultValues: {
      fromEmail: "",
      fromName: "",
      toEmail: "",
      toName: "",
      subject: "",
      message: "",
    },
  });

  const sendMailMutation = useMutation({
    mutationFn: trpcClient.sendMail.mutate,
    onSuccess(data, _variables, _context) {
      if (data.ok) {
        toast.success("Successfully send an email");
      } else {
        toast.error("Failed to send an email");
      }
    },
  });

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-lg p-6">
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit((data) => {
            sendMailMutation.mutate({
              subject: data.subject,
              content: [
                {
                  type: "text/plain",
                  value: data.message,
                },
              ],
              from: {
                email: data.fromEmail,
                name: data.fromName || data.fromEmail,
              },
              personalizations: [
                {
                  to: [
                    {
                      email: data.toEmail,
                      name: data.toName || data.toEmail,
                    },
                  ],
                },
              ],
            });
          })}
        >
          <label className="flex flex-col gap-1">
            <span className="text-colorTextSecondary">From (email)</span>
            <input
              className="antd-input px-1"
              type="email"
              required
              {...form.register("fromEmail")}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-colorTextSecondary">From (name)</span>
            <input
              className="antd-input px-1"
              {...form.register("fromName")}
              placeholder="optional"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-colorTextSecondary">To (email)</span>
            <input
              className="antd-input px-1"
              type="email"
              required
              {...form.register("toEmail")}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-colorTextSecondary">To (name)</span>
            <input
              className="antd-input px-1"
              {...form.register("toName")}
              placeholder="optional"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-colorTextSecondary">Subject</span>
            <input
              className="antd-input px-1"
              required
              {...form.register("subject")}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="text-colorTextSecondary">Message</span>
            <textarea
              className="antd-input px-1"
              required
              rows={6}
              {...form.register("message")}
            />
          </label>
          <button
            className={cls(
              "antd-btn antd-btn-primary p-1",
              sendMailMutation.isLoading && "antd-btn-loading"
            )}
          >
            Send
          </button>
          {sendMailMutation.isSuccess && !sendMailMutation.data.ok && (
            <div className="border border-colorErrorBorder text-colorErrorText p-2 text-sm flex flex-col gap-0.5">
              <div>status: {sendMailMutation.data.value.status}</div>
              <div>statusText: {sendMailMutation.data.value.statusText}</div>
              <div>
                errors: <br />
                {sendMailMutation.data.value.errors.join("\n")}
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
