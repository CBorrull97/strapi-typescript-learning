/**
 * course controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::course.course', () => ({
  async find(ctx) {
    const { data, meta } = await super.find(ctx);
    const newMeta = {
      ...meta,
      servedAt: new Date().toISOString(),
    };
    return { data, meta: newMeta };
  },
}));

