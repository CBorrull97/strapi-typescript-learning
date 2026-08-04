/**
 * lesson service
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreService("api::lesson.lesson", () => ({
  async isPositionAvailable(
    courseDocumentId: string,
    position: number,
    excludedDocumentId?: string,
  ): Promise<boolean> {
    const { results } = await super.find({
      filters: {
        position,
        course: {
          documentId: courseDocumentId,
        },
        ...(excludedDocumentId === undefined
          ? {}
          : {
              documentId: {
                $ne: excludedDocumentId,
              },
            }),
      },
    });
    return results.length === 0;
  },
}));
