import "virtual:uno.css";
import { tinyassert } from "@hiogawa/utils";
import React from "react";
import { createRoot } from "react-dom/client";
import { Root } from "./root";

function main() {
  const el = document.querySelector("#root");
  tinyassert(el);
  const root = createRoot(el);
  root.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>
  );
}

main();
