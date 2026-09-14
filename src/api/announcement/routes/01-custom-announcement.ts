import type { Core } from "@strapi/strapi";

const routes: Core.RouterConfig = {
  type: "content-api",
  routes: [
    {
      method: "GET",
      path: "/announcements/expired",
      handler: "api::announcement.announcement.findExpiredActive",
      config: {
        policies: ["api::announcement.require-expired-key"],
      },
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
    {
      method: "GET",
      path: "/announcements/search",
      handler: "api::announcement.announcement.searchByTitle",
    },
    {
      method: "PUT",
      path: "/announcements/:documentId/active",
      handler: "api::announcement.announcement.setActive",
    },
  ],
};

export default routes;
