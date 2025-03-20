import express from "express";
import mongoose from "mongoose";
import exceptionHandler from "./exceptionHandler";
import userRouter from "./routes/userRoute";
import adminRouter from "./routes/adminRoute";

const PORT = 3000;

const app = express();

app.use(express.json());

app.use(exceptionHandler);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/courses", courseRouter);

main().then(console.log("mongodb connected")).catch(err => console.err(err));

async function main() {
    await mongoose.connect();
    app.listen(PORT, () => {
        console.log(`Application started on PORT ${3000}`);
    });
}
