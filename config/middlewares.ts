import type { Core } from '@strapi/strapi';

const config: Core.Config.Middlewares = [
  'strapi::logger',
  'strapi::errors',
  'global::request-id',
  "global::api-request-logger",
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];

export default config;
