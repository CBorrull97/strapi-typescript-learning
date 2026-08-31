import type { Core } from "@strapi/strapi";
import { errors } from "@strapi/utils";

function getCourseDocumentId(course: unknown): string | null | undefined {
  if (typeof course === "string") {
    return course;
  }

  if (!isRecord(course)) {
    return undefined;
  }

  const connect = course.connect;

  if (Array.isArray(connect)) {
    const firstConnection = connect[0];

    if (
      isRecord(firstConnection) &&
      typeof firstConnection.documentId === "string"
    ) {
      return firstConnection.documentId;
    }
  }

  const disconnect = course.disconnect;

  if (Array.isArray(disconnect) && disconnect.length > 0) {
    return null;
  }

  return undefined;
}

async function ensureLessonPositionAvailable(
  strapi: Core.Strapi,
  courseDocumentId: string,
  position: number,
  excludeDocumentId?: string,
): Promise<void> {
  const positionAvailable = await strapi
    .service("api::lesson.lesson")
    .isPositionAvailable(courseDocumentId, position, excludeDocumentId);

  if (!positionAvailable) {
    throw new errors.ValidationError(
      "Lesson position already exists for this course",
    );
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi.documents.use(async (context, next) => {
      if (context.uid !== "api::lesson.lesson") {
        return next();
      }

      if (context.action !== "create" && context.action !== "update") {
        return next();
      }

      const data = context.params.data;
      const courseDocumentId = getCourseDocumentId(data?.course);

      strapi.log.info(
        `Lesson input: ${JSON.stringify({
          action: context.action,
          position: data?.position,
          course: data?.course,
          courseDocumentId,
        })}`,
      );

      if (context.action === "create") {
        const position = data?.position;
        if (
          typeof position === "number" &&
          typeof courseDocumentId === "string"
        ) {
          await ensureLessonPositionAvailable(
            strapi,
            courseDocumentId,
            position,
          );
        }
      }
      if (context.action === "update") {
        const currentLesson = await strapi
          .documents("api::lesson.lesson")
          .findOne({
            documentId: context.params.documentId,
            populate: {
              course: true,
            },
          });
        if (currentLesson === null) {
          return next();
        }
        let finalPosition = currentLesson.position;
        if (typeof data?.position === "number") {
          finalPosition = data.position;
        }
        let finalCourseDocumentId = currentLesson.course?.documentId;
        if (courseDocumentId === null) {
          finalCourseDocumentId = undefined;
        }
        if (typeof courseDocumentId === "string") {
          finalCourseDocumentId = courseDocumentId;
        }
        if (
          typeof finalCourseDocumentId === "string" &&
          typeof finalPosition === "number"
        ) {
          await ensureLessonPositionAvailable(
            strapi,
            finalCourseDocumentId,
            finalPosition,
            currentLesson.documentId,
          );
        }
      }

      const result = await next();

      strapi.log.info(`Lesson document operation succeeded: ${context.action}`);

      return result;
    });
  },
  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
