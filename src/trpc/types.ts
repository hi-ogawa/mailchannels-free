import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import type { trpcRouter } from "./router";

export type TrpcInputs = inferRouterInputs<typeof trpcRouter>;
export type TrpcOutputs = inferRouterOutputs<typeof trpcRouter>;
