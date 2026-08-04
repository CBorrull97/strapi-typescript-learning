/**
 * lesson controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::lesson.lesson",
  ({ strapi }) => ({
    async create(ctx) {
      const data = ctx.request.body?.data;

      if (
        typeof data?.position !== "number" ||
        typeof data?.course !== "string"
      ) {
        return super.create(ctx);
      }
      const positionAvailable = await strapi
        .service("api::lesson.lesson")
        .isPositionAvailable(data.course, data.position);

      if (!positionAvailable) {
        return ctx.badRequest("Lesson position already exists for this course");
      }
      return super.create(ctx);
    },
  }),
);
