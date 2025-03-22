import { Router } from "express";
import userController from "../controllers/userController";
import userAuthMiddleware from "../middlewares/userAuth";

const userRouter = Router();

userRouter.post("/signup", userController.userSignup );

userRouter.post("/signin", userController.userSignin);

userRouter.post("/logout", userAuthMiddleware,userController.userSignout);

userRouter.get("/mycourses", userAuthMiddleware,userController.getUserPurchases)

export default userRouter;
