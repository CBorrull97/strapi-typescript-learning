import type { Core } from "@strapi/strapi";

const apiRequestLoggerMiddleware: Core.MiddlewareFactory = (
  _config,
  { strapi },
) => {
  return async (ctx, next) => {
    await next();
    if (ctx.path.startsWith("/api/")) {
      strapi.log.info(
        "API request completed: " +
          ctx.method +
          " " +
          ctx.path +
          " " +
          ctx.status,
      );
    }
  };
};
export default apiRequestLoggerMiddleware;
