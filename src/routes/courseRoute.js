import { Router } from "express";
import userAuthMiddleware from "../middlewares/userAuth";
import courseController from "../controllers/courseController";
import userSessionMiddleware from "../middlewares/userSession"
const courseRouter = Router();

courseRouter.post("/purchase", userSessionMiddleware, userAuthMiddleware, courseController.purchaseCourse);

courseRouter.get("/preview", courseController.previewCourses);

export default courseRouter;