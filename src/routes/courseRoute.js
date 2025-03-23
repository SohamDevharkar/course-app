import { Router } from "express";
import userAuthMiddleware from "../middlewares/userAuth.js";
import courseController from "../controllers/courseController.js";
import userSessionMiddleware from "../middlewares/userSession.js"
const courseRouter = Router();

courseRouter.post("/purchase", userSessionMiddleware, userAuthMiddleware, courseController.purchaseCourse);

courseRouter.get("/preview", courseController.previewCourses);

export default courseRouter;