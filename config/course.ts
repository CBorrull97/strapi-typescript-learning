import type { Core } from "@strapi/strapi";

const courseConfig = ({
  env,
}: Core.Config.Shared.ConfigParams) => ({
  statsKey: env("COURSE_STATS_KEY"),
});

export default courseConfig;