import { oas31 } from "openapi3-ts";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";
import packageJson from "../../package.json";
import {
  Z_MAILCHANNELS_INPUT,
  Z_MAILCHANNELS_OUTPUT,
} from "../utils/mailchannels";

export const openapiDocument: oas31.OpenAPIObject = {
  openapi: "3.0.0",
  info: {
    title: packageJson.name,
    version: packageJson.version,
  },
  servers: [
    {
      description: "production",
      url: "https://mailchannels-free-hiro18181.vercel.app",
    },
    {
      description: "development",
      url: "http://localhost:5173",
    },
  ],
  paths: {
    "/trpc/sendMail": {
      post: {
        requestBody: {
          content: {
            "application/json": {
              schema: zodToJsonSchema(
                z.object({ input: Z_MAILCHANNELS_INPUT })
              ) as any,
            },
          },
        },
        responses: {
          200: {
            description: "",
            content: {
              "application/json": {
                schema: zodToJsonSchema(
                  z.object({ output: Z_MAILCHANNELS_OUTPUT })
                ) as any,
              },
            },
          } satisfies oas31.ResponseObject,
        },
      },
    },
  },
};
