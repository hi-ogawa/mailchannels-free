import { RequestHandler, compose } from "@hattip/compose";
import { importIndexHtml } from "@hiogawa/vite-import-index-html/dist/runtime";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { TRPC_ENDPOINT } from "../trpc/common";
import { trpcRouter } from "../trpc/router";

export function createHattipEntry() {
  return compose(trpcHanlder(), indexHtmlHandler());
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

//
// trpc
//

function trpcHanlder(): RequestHandler {
  return (ctx) => {
    if (ctx.url.pathname.startsWith(TRPC_ENDPOINT)) {
      return fetchRequestHandler({
        endpoint: TRPC_ENDPOINT,
        req: ctx.request,
        router: trpcRouter,
        createContext: (ctx) => ctx,
        onError: (e) => {
          console.error(e);
        },
      });
    }
    return ctx.next();
  };
}
