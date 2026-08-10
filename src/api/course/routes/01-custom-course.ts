import type { Core } from "@strapi/strapi";

const routes: Core.RouterConfig = {
    type: "content-api",
    routes: [
        {
            method: "GET",
            path: "/courses/by-level/:level",
            handler: "api::course.course.findByLevel",
        },
        {
            method: "GET",
            path: "/courses/by-url-key/:urlKey",
            handler: "api::course.course.findByUrlKey",
        },
        {
            method: "GET",
            path: "/courses/by-url-key/:urlKey/stats",
            handler: "api::course.course.getStatsByUrlKey",
            config: {
                policies: [
                    {
                        name: "api::course.require-stats-key",
                        config: {
                            key: "typescript-learning",
                        },
                    },
                ],
                middlewares: ["api::course.response-time"],
            },
        },
    ],
};

export default routes;