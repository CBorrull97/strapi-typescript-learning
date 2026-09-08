/**
 * announcement controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::announcement.announcement",
  ({ strapi }) => ({
    async findActiveByCourse(ctx) {
      const { courseDocumentId } = ctx.params;
      const announcements = await strapi
        .service("api::announcement.announcement")
        .findActiveByCourse(courseDocumentId);
      const sanitizedResults = await this.sanitizeOutput!(announcements, ctx);
      return this.transformResponse!(sanitizedResults);
    },

    async findExpiredActive(ctx) {
      const announcements = await strapi
        .service("api::announcement.announcement")
        .findExpiredActive();
      const sanitizedResults = await this.sanitizeOutput!(announcements, ctx);
      return this.transformResponse!(sanitizedResults);
    },

    async countByCourse(ctx) {
      const { courseDocumentId } = ctx.params;
      const announcementCount = await strapi
        .service("api::announcement.announcement")
        .countByCourse(courseDocumentId);
      return this.transformResponse!({
        count: announcementCount,
      });
    },
  }),
);
