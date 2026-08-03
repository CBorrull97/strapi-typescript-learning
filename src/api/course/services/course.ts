/**
 * course service
 */

import { factories } from "@strapi/strapi";
import type { CourseLevel } from "../utils/course-level";
import type { CourseStats } from "../utils/course-stats";
import { calculateTotalDuration } from "../utils/course-stats";

export default factories.createCoreService("api::course.course", () => ({
  async findPublishedByLevel(level: CourseLevel) {
    return super.find({
      filters: {
        level,
      },
      status: "published",
    });
  },

  async findPublishedByUrlKey(urlKey: string) {
    const { results } = await super.find({
      filters: {
        urlKey,
      },
      status: "published",
      populate: {
        lessons: {
          sort: ["position:asc"],
        },
      },
    });
    return results[0];
  },

  async getStatsByUrlKey(urlKey: string): Promise<CourseStats | undefined> {
    const course = await this.findPublishedByUrlKey(urlKey);
    if (!course) {
      return undefined;
    }
    const lessons = course.lessons ?? [];
    const courseStats: CourseStats = {
      documentId: course.documentId,
      title: course.title,
      lessonCount: lessons.length,
      totalDurationMinutes: calculateTotalDuration(lessons),
    };
    return courseStats;
  },
}));
