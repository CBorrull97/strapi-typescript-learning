import type { Core } from "@strapi/strapi";

const cacheControl: Core.MiddlewareFactory = () => {
  return async (ctx, next) => {
    await next();
    if (ctx.status >= 200 && ctx.status <= 299) {
      ctx.set("Cache-Control", "public, max-age=60");
    }
  };
};

export default cacheControl;