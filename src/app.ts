import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from 'cors';
import router from "./routes/index.js";
import logger from "./utils/logger.utils.js";


//TODO Metrics

const port = parseInt(process.env.port as string);
const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);



if (process.env.NODE_ENV !== 'test') {
  app.listen(port, async () => {
    logger.info(`App is running at http://localhost:${port}`);

    // await connectRetable();


  });
}
export default app;

