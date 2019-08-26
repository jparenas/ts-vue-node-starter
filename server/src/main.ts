import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import webpack from "webpack";
import middleware from "webpack-dev-middleware";
import hotReload from "webpack-hot-middleware";

const webpackConfig = require("@vue/cli-service/webpack.config.js");
const compiler = webpack(webpackConfig);

const isProduction = process.env.NODE_ENV === "production";

const app = express();

app.use(morgan("common"));
app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.resolve(__dirname, "../public")));

if (!isProduction) {
  app.use(middleware(compiler));
  app.use(hotReload(compiler));
}

app.get("*", function(req: express.Request, res: express.Response) {
  res.sendFile(path.resolve(__dirname, "../public/index.html"));
});

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
