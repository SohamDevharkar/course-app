import { Router } from "express";
import bcrypt  from "bcrypt";
import { courseModel, purchaseModel, userModel } from "../../db/db";
import auth from "../middlewares/authenitcation";
import { validationMiddleware, signupValidationObject, signinValidationObject } from "../validation/validation";

const userRouter = Router();

userRouter.post("/signup", validationMiddleware(signupValidationObject), async (req, res ,next) => {
    try {
        const {email, username, password} = req.body;
        const User = userModel.findOne({username: username, email: email});
        if( User ) {
            console.log("User already exists");
            res.status(400).send(`User with username ${username} & ${email} already exists`);
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await userModel.create({
                username: username,
                email: email,
                password: hashedPassword
            })
            console.log("User signup successful.\n")
            res.status(202).send("User registration completed.")
        }
    } catch (error) {
        res.status(500).send("server error ocurred")
        next (error);
    }   
});

userRouter.post("/signin", validationMiddleware(signinValidationObject), async (req, res ,next) => {
    const { username, password } = req.body;
    const User = userModel.findOne({ username: username });
    if (!User) {
        console.log("Username doesn't exist");
        res.status(404).send(`Username ${username} not registered`);
    } 
    const password_match = await bcrypt.compare(password, User.password);
    if(password_match) {
        req.session.regenerate( (error) => {
            if(error) {
                console.error(`Error regenerating session`);
                next(err);
            } else {
                req.session.user = User._Id;
                console.log(`user ${User.username} signin successful`)
                res.status(200).send(`logged in as ${User.username}`);
            }
        });   
    } else {
        console.log("Incorrect password signin failed.\n")
        res.status(401).send("incorrect password");
    }    
});

userRouter.post("/logout", (req, res ,next) => {
    req.session.destroy( (err) => {
        if(err) {
            console.error(err);
            res.status(400).send("log out error");
        }
        else {
            req.session.clearCookie("connect.sid", {path: "/signin"});
            console.log("user logged out");
            res.status(200).send("User logged out");
        }
    });
});

userRouter.get("/mycourses", auth, (req, res ,next) => {
    
})

export {
    userRouter
}
