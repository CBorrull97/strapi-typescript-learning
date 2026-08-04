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

    async update(ctx) {
      const { id: documentId } = ctx.params;
      const currentLesson = await strapi
        .documents("api::lesson.lesson")
        .findOne({
          documentId,
          populate: {
            course: true,
          },
        });
      if (currentLesson === null) {
        return ctx.notFound("Lesson not found");
      }
      const data = ctx.request.body?.data;
      const finalPosition =
        typeof data?.position === "number"
          ? data.position
          : currentLesson.position;
      const finalCourse =
        typeof data?.course === "string"
          ? data.course
          : currentLesson.course?.documentId;
      if (
        typeof finalPosition !== "number" ||
        typeof finalCourse !== "string"
      ) {
        return super.update(ctx);
      }
      const positionAvailable = await strapi
        .service("api::lesson.lesson")
        .isPositionAvailable(
          finalCourse,
          finalPosition,
          currentLesson.documentId,
        );
      if (!positionAvailable) {
        return ctx.badRequest("Lesson position already exists for this course");
      }
      return super.update(ctx);
    },
  }),
);
