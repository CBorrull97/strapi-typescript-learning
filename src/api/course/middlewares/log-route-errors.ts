import type { Core } from "@strapi/strapi";

const logRouteErrors: Core.MiddlewareFactory = (_config, { strapi }) => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      const requestId =
        typeof ctx.state.requestId === "string"
          ? ctx.state.requestId
          : "unknown";
      strapi.log.error(
        `[requestId=${requestId}] Course request failed: ${ctx.method} ${ctx.url}`,
        error,
      );
      throw error;
    }
  };
};

export default logRouteErrors;
