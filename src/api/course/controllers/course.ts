/**
 * course controller
 */

import { factories } from "@strapi/strapi";
import { isCourseLevel } from "../utils/course-level";

export default factories.createCoreController(
  "api::course.course",
  ({ strapi }) => ({
    async find(ctx) {
      const { data, meta } = await super.find(ctx);
      const newMeta = {
        ...meta,
        servedAt: new Date().toISOString(),
      };
      return { data, meta: newMeta };
    },

    async findByLevel(ctx) {
      const { level } = ctx.params;
      if (!isCourseLevel(level)) {
        return ctx.badRequest("Invalid course level");
      }
      const { results, pagination } = await strapi
        .service("api::course.course")
        .findPublishedByLevel(level);
      const sanitizedResults = await this.sanitizeOutput!(results, ctx);
      return this.transformResponse!(sanitizedResults, { pagination });
    },

    async findByUrlKey(ctx) {
      const { urlKey } = ctx.params;
      const course = await strapi
        .service("api::course.course")
        .findPublishedByUrlKey(urlKey);
      if (!course) {
        return ctx.notFound("Course not found");
      }
      const sanitizedCourse = await this.sanitizeOutput!(course, ctx);
      return this.transformResponse!(sanitizedCourse);
    },

    async getStatsByUrlKey(ctx) {
      const { urlKey } = ctx.params;
      const stats = await strapi
        .service("api::course.course")
        .getStatsByUrlKey(urlKey);
      if (stats === undefined) {
        return ctx.notFound("Course not found");
      }
      return this.transformResponse!(stats);
    },

    async authCheck(ctx) {
      const user = ctx.state.user;

      if (!user) {
        return ctx.unauthorized("Authentication required");
      }

      return {
        data: {
          id: user.id,
          documentId: user.documentId,
          username: user.username,
          email: user.email,
        },
      };
    },
  }),
);
