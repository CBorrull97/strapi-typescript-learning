import type { Core } from "@strapi/strapi";

interface RequireStatsKeyConfig {
  key: string;
}

const requireStatsKey: Core.PolicyHandler<RequireStatsKeyConfig> = (
  policyContext,
  config,
) => {
  const receivedKey = policyContext.request.headers["x-stats-key"];

  return receivedKey === config.key;
};

export default requireStatsKey;
