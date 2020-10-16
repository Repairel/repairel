const withImages = require("next-images");
const isProd = process.env.NODE_ENV === "production";
const withPWA = require("next-pwa");
module.exports = withImages(
  withPWA({
    pwa: {
      disable: !isProd,
      dest: "public",
    },
  })
);
