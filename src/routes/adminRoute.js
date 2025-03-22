import { Router } from "express";
import adminController from "../controllers/adminController"
import adminAuthMiddleware from "../middlewares/adminAuth";
const adminRouter = Router();

adminRouter.post("/signup", adminController.adminSignup);

adminRouter.post("/signin", adminController.adminSignin)

adminRouter.get("/logout",adminAuthMiddleware, adminController.adminLogout);

adminRouter.post("/create", adminAuthMiddleware, adminController.createCourse);

adminRouter.put("/update", adminAuthMiddleware, adminController.updateCourse);

adminRouter.get("/courses", adminAuthMiddleware, adminController.getAllCourses);

adminRouter.get("/delete", adminAuthMiddleware, adminController.deleteCourse);

export default adminRouter;
