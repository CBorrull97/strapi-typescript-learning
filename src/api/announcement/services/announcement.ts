/**
 * announcement service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService(
  "api::announcement.announcement",
  ({ strapi }) => ({
    async findActiveByCourse(courseDocumentId: string) {
      const now = new Date().toISOString();
      const { results } = await super.find({
        filters: {
          active: true,
          expiresAt: {
            $gt: now,
          },
          course: {
            documentId: courseDocumentId,
          },
        },
        sort: { expiresAt: "asc" },
      });
      return results;
    },

    async findExpiredActive() {
      const now = new Date().toISOString();
      const announcements = await strapi
        .documents("api::announcement.announcement")
        .findMany({
          filters: {
            active: true,
            expiresAt: {
              $lte: now,
            },
          },
          sort: {
            expiresAt: "asc",
          },
        });
      return announcements;
    },

    async deactivateExpired(): Promise<number> {
      const announcements = await this.findExpiredActive();
      let deactivatedAnnouncements = 0;
      for (const announcement of announcements) {
        await strapi.documents("api::announcement.announcement").update({
          documentId: announcement.documentId,
          data: {
            active: false,
          },
        });
        deactivatedAnnouncements += 1;
      }
      return deactivatedAnnouncements;
    },
  }),
);
