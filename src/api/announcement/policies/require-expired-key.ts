import type { Core } from "@strapi/strapi";

const requireExpiredKey: Core.PolicyHandler = (
  policyContext,
  _config,
  { strapi },
) => {
  const receivedKey = policyContext.request.headers["x-announcements-key"];

  const expectedKey = strapi.config.get<string | undefined>(
    "announcement.expiredKey",
  );
  return (
    typeof expectedKey === "string" &&
    expectedKey.length > 0 &&
    receivedKey === expectedKey
  );
};

export default requireExpiredKey;
