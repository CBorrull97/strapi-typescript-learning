import { randomUUID } from "node:crypto";
import type { Core } from "@strapi/strapi";

const requestIdMiddleware: Core.MiddlewareFactory = () => {
  return async (ctx, next) => {
    const requestId = randomUUID();
    ctx.state.requestId = requestId;
    ctx.set("X-Request-ID", requestId);

    await next();
  };
};

export default requestIdMiddleware;
