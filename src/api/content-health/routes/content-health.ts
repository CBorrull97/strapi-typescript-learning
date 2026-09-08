import type { Core } from "@strapi/strapi";

const routes: Core.RouterConfig = {
  type: "content-api",
  routes: [
    {
      method: "GET",
      path: "/content-health",
      handler: "api::content-health.content-health.getStatus",
      config: {
        auth: false,
      },
    },
  ],
};

export default routes;
