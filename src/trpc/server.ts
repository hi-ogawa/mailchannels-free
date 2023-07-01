import { RequestHandler } from "@hattip/compose";
import { TinyRpcRoutes, createTinyRpcHandler } from "@hiogawa/tiny-rpc";
import { zodFn } from "@hiogawa/tiny-rpc/dist/zod";
import { Z_MAILCHANNELS_INPUT, sendMail } from "../utils/mailchannels";
import { RPC_ENDPOINT } from "./client";

export const rpcRoutes = {
  sendMail: zodFn(Z_MAILCHANNELS_INPUT)(async (input) => {
    return sendMail(input);
  }),
} satisfies TinyRpcRoutes;

export function rpcHandler(): RequestHandler {
  return createTinyRpcHandler({
    endpoint: RPC_ENDPOINT,
    routes: rpcRoutes,
    onError(e) {
      console.error(e);
    },
  });
}
