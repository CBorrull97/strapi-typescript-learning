/**
 * course service
 */

import { factories } from "@strapi/strapi";
import type { CourseLevel } from "../utils/course-level";

export default factories.createCoreService("api::course.course", () => ({
  async findPublishedByLevel(level: CourseLevel) {
    return super.find({
      filters: {
        level,
      },
      status: "published",
    });
  },
}));
