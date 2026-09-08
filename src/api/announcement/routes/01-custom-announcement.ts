import type { Core } from "@strapi/strapi";

const routes: Core.RouterConfig = {
  type: "content-api",
  routes: [
    {
      method: "GET",
      path: "/announcements/expired",
      handler: "api::announcement.announcement.findExpiredActive",
    },
    {
      method: "GET",
      path: "/announcements/active/:courseDocumentId",
      handler: "api::announcement.announcement.findActiveByCourse",
      config: {
        middlewares: ["api::announcement.cache-control"],
      },
    },
    {
      method: "GET",
      path: "/announcements/count/:courseDocumentId",
      handler: "api::announcement.announcement.countByCourse",
    },
  ],
};

export default routes;
