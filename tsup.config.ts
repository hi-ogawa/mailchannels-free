import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/trpc/types.ts"],
  dts: true,
});
