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
    },
  ],
};

export default routes;
