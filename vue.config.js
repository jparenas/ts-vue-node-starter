const webpack = require("webpack");
const path = require("path");

module.exports = {
  outputDir: path.resolve(__dirname, "dist/server/public"),
  configureWebpack: config => {
    config.mode = process.env.NODE_ENV || "development";
    config.entry = {
      app: ["./client/src/main.ts"]
    };
    config.resolve.alias["@"] = path.resolve(__dirname, "client/src");
    if (process.env.NODE_ENV != "production") {
      config.entry["app"].push("webpack-hot-middleware/client");
    }
    config.devServer = {
      watchOptions: {
        host: "localhost"
      }
    };
  }
};
