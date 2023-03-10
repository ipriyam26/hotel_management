import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import bodyParser from "body-parser";
import ExpressMongoSanitize from "express-mongo-sanitize";
import { connectDB } from "./api/v1/db";
import config from "./config/constants";
import {bookingsRouter,roomRouter} from "./api/v1/routes";
import * as dotenv from "dotenv";
import { getRoomsAndTypes } from "./api/v1/services/room";
dotenv.config();


const app = express();

app.use(cors());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 15, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(ExpressMongoSanitize(
    {
        replaceWith: '_'
    }
));

app.use("/api/v1/bookings", bookingsRouter);
app.use("/api/v1/rooms", roomRouter);

const start = async () => {
    try {
        // console.log(process.env.MONGO_URL)
        await connectDB(process.env.MONGO_URL);
        getRoomsAndTypes();
        app.listen(config.port, () => {
        console.log(`Listening on port ${config.port}!`);
        });
    } catch (e) {
        console.error(e);
    }
    }

start();