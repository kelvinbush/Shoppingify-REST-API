import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import config from "config";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import connectToDatabase from "./utils/connectToDb";
import routes from "./routes";

const port = process.env.PORT || config.get<number>("port");

const app = express();

app.use(cookieParser());

app.use(express.json());

app.listen(port, async () => {
  logger.info(`App is running at http://localhost:${port}`);
  routes(app);
  await connectToDatabase();
});
