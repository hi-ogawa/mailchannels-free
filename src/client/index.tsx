import "virtual:uno.css";
import { tinyassert } from "@hiogawa/utils";
import { createRoot } from "react-dom/client";
import { Root } from "./root";

function main() {
  const el = document.querySelector("#root");
  tinyassert(el);
  const root = createRoot(el);
  root.render(<Root />);
}

main();
