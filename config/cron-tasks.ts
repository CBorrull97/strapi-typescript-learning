import type { Modules } from "@strapi/strapi";

const cronTasks: Modules.Cron.CronTasks = {
  deactivateExpiredAnnouncements: {
    task: async ({ strapi }) => {
      const deactivatedAnnouncements = await strapi
        .service("api::announcement.announcement")
        .deactivateExpired();
      strapi.log.info(
        "Number of deactivated announcements: " + deactivatedAnnouncements,
      );
    },
    options: "0 0 * * *", // minuto/hora/día/mes/día-semana
  },
};

export default cronTasks;
