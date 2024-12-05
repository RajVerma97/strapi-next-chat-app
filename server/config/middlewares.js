module.exports = [
  "strapi::errors",
  {
    name: "strapi::security",
    config: {
      cors: {
        enabled: true,
        origin: ["https://strapi-next-chat-app.vercel.app"],
      },
    },
  },
  "strapi::cors",
  "strapi::poweredBy",
  "strapi::logger",
  "strapi::query",
  "strapi::body",
  "strapi::session",
  "strapi::favicon",
  "strapi::public",
];
