import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

import { exceptionHandler } from "./exceptionHandler.js"
import userRouter from "./routes/userRoute.js";
import adminRouter from "./routes/adminRoute.js";
import courseRouter from "./routes/courseRoute.js";

import userSessionMiddleware from "./middlewares/userSession.js";
import adminSessionMiddleware from "./middlewares/adminSession.js";

const PORT = process.env.PORT;
const app = express();
const MONGODB_URL = process.env.MONGO_URL;

app.use(express.json());
app.use(exceptionHandler);

app.use("/api/v1/user", userSessionMiddleware, userRouter);
app.use("/api/v1/admin", adminSessionMiddleware, adminRouter);
app.use("/api/v1/courses", courseRouter);





async function main() {
    try {
        console.log(MONGODB_URL)
        await mongoose.connect(MONGODB_URL);
        console.log("Connected to MongoDB course-app");

        app.listen(PORT, () => {
            console.log(`Application started on PORT ${3000}`);
        });
    } catch (err) {
        console.log("Failed to connect to the database");
    }
}

main();