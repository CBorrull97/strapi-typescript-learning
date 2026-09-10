import type { Core } from "@strapi/strapi";

const announcementConfig = ({ env }: Core.Config.Shared.ConfigParams) => ({
  expiredKey: env("ANNOUNCEMENT_EXPIRED_KEY"),
});

export default announcementConfig;
