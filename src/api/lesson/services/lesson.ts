/**
 * lesson service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::lesson.lesson", () => ({
  async isPositionAvailable(
    courseDocumentId: string,
    position: number,
  ): Promise<boolean> {
    const { results } = await super.find({
      filters: {
        position,
        course: {
          documentId: courseDocumentId,
        },
      },
    });
    return results.length === 0;
  },
}));
