import { type RequestHandler, compose } from "@hattip/compose";
import { cors } from "@hattip/cors";
import { importIndexHtml } from "@hiogawa/vite-import-index-html/dist/runtime";
import { openapiDocumentHandler, rpcHandler } from "../trpc/server";

export function createHattipEntry() {
  return compose(
    cors(),
    openapiDocumentHandler(),
    rpcHandler(),
    indexHtmlHandler()
  );
}

//
// index.html
//

function indexHtmlHandler(): RequestHandler {
  return async () => {
    const html = await importIndexHtml();
    return new Response(html, {
      headers: [["content-type", "text/html"]],
    });
  };
}
