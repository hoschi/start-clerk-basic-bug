import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const router = createRouter({
    routeTree,
    //defaultPreload: 'intent',
    //defaultErrorComponent: DefaultCatchBoundary,
    //defaultNotFoundComponent: () => <NotFound />,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    context: {},
  });

  return router;
}
