import { Router } from "express";
import userController from "../controllers/userController.js";
import userAuthMiddleware from "../middlewares/userAuth.js";

const userRouter = Router();

userRouter.post("/signup", userController.userSignup );

userRouter.post("/signin", userController.userSignin);

userRouter.get("/logout", userAuthMiddleware,userController.userSignout);

userRouter.get("/mycourses", userAuthMiddleware,userController.getUserPurchases)

export default userRouter;
