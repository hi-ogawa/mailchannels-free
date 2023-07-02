import { Err, Ok, wrapError } from "@hiogawa/utils";
import { z } from "zod";

export const Z_MAILCHANNELS_INPUT = z.object({
  subject: z.string(),
  content: z
    .object({
      type: z.string().describe("e.g. text/plain"),
      value: z.string(),
    })
    .array(),
  from: z.object({
    email: z.string(),
    name: z.string(),
  }),
  personalizations: z
    .object({
      to: z
        .object({
          email: z.string(),
          name: z.string(),
        })
        .array(),
    })
    .array(),
});

export const Z_MAILCHANNELS_OUTPUT = z.object({
  ok: z.boolean(),
  value: z.unknown(),
});

const Z_MAILCHANNELS_ERROR_OUTPUT = z.object({
  errors: z.string().array(),
});

type MailchannelsInput = z.infer<typeof Z_MAILCHANNELS_INPUT>;

export async function sendMail(input: MailchannelsInput) {
  const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    const text = await res.text();
    const info = wrapError(() =>
      Z_MAILCHANNELS_ERROR_OUTPUT.parse(JSON.parse(text))
    );
    return Err({
      status: res.status,
      statusText: res.statusText,
      errors: info.ok ? info.value.errors : [text],
    });
  }
  return Ok({});
}
