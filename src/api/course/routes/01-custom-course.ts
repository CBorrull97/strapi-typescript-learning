import type { Core } from "@strapi/strapi";

const routes: Core.RouterConfig = {
  type: "content-api",
  routes: [
    {
      method: "GET",
      path: "/courses/auth-check",
      handler: "api::course.course.authCheck",
    },
    {
      method: "GET",
      path: "/courses/by-level/:level",
      handler: "api::course.course.findByLevel",
    },
    {
      method: "GET",
      path: "/courses/by-url-key/:urlKey",
      handler: "api::course.course.findByUrlKey",
    },
    {
      method: "GET",
      path: "/courses/by-url-key/:urlKey/stats",
      handler: "api::course.course.getStatsByUrlKey",
      config: {
        policies: ["api::course.require-stats-key"],
        middlewares: [
          "api::course.log-route-errors",
          "api::course.response-time",
        ],
      },
    },
  ],
};

export default routes;
