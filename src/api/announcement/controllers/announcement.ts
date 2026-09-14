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

    async searchByTitle(ctx) {
      const { text } = ctx.query;
      if (typeof text !== "string") {
        return ctx.badRequest("Query parameter text is required");
      }
      const searchText = text.trim();
      if (searchText.length === 0) {
        return ctx.badRequest("Query parameter text cannot be empty");
      }
      const announcements = await strapi
        .service("api::announcement.announcement")
        .searchByTitle(searchText);
      const sanitizedResults = await this.sanitizeOutput!(announcements, ctx);
      return this.transformResponse!(sanitizedResults);
    },

    async setActive(ctx) {
      const { documentId } = ctx.params;
      const active = ctx.request.body?.data?.active;
      if (typeof active !== "boolean") {
        return ctx.badRequest("Field active must be a boolean");
      }
      const updatedAnnouncement = await strapi
        .service("api::announcement.announcement")
        .setActive(documentId, active);
      const sanitizedResults = await this.sanitizeOutput!(
        updatedAnnouncement,
        ctx,
      );
      return this.transformResponse!(sanitizedResults);
    },
  }),
);
