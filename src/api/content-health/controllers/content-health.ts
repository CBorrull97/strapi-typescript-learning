import type { Core } from "@strapi/strapi";

const contentHealthController: Core.Controller = {
  getStatus(ctx) {
    ctx.body = {
      data: {
        status: "ok",
      },
    };
  },
};

export default contentHealthController;
