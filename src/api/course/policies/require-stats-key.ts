import type { Core } from "@strapi/strapi";

const requireStatsKey: Core.PolicyHandler = (
  policyContext,
  _config,
  { strapi },
) => {
  const receivedKey = policyContext.request.headers["x-stats-key"];

  const expectedKey = strapi.config.get<string | undefined>("course.statsKey");
  return (
    typeof expectedKey === "string" &&
    expectedKey.length > 0 &&
    receivedKey === expectedKey
  );
};

export default requireStatsKey;
