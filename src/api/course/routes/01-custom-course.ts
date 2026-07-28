import type { Core } from "@strapi/strapi";

const routes: Core.RouterConfig = {
    type: "content-api",
    routes: [
        {
            method: "GET",
            path: "/courses/by-level/:level",
            handler: "api::course.course.findByLevel",
        },
    ],
};

export default routes;