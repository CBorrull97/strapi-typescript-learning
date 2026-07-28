/**
 * course controller
 */

import { factories } from "@strapi/strapi";
import { isCourseLevel } from "../utils/course-level";

export default factories.createCoreController("api::course.course", () => ({
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
    ctx.query = {
      ...ctx.query,
      status: "published",
      filters: {
        level,
      },
    };
    return super.find(ctx);
  },
}));
