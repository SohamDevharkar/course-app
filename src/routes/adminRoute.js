import { Router } from "express";
import bcrypt  from "bcrypt";
import { adminModel } from "../../db/db";
import { validationMiddleware, signupValidationObject, signinValidationObject } from "../validation/validation";

const adminRouter = Router();

adminRouter.post("/signup", validationMiddleware(signupValidationObject), async (req, res ,next) => {
    try {
            const {email, username, password} = req.body;
            const User = adminModel.findOne({username: username, email: email});
            if( User ) {
                console.log("Admin already exists");
                res.status(400).send(`Admin with username ${username} & ${email} already exists`);
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                await adminModel.create({
                    username: username,
                    email: email,
                    password: hashedPassword
                })
                console.log("Admin signup successful.\n")
                res.status(202).send("Admin registration completed.")
            }
        } catch (error) {
            res.status(500).send("server error ocurred")
            next (error);
        }
})

adminRouter.post("/signin", validationMiddleware(signinValidationObject), async (req, res ,next) => {
    const { username, password } = req.body;
    const Admin = adminModel.findOne({ username: username });
    if (!Admin) {
        console.log("Admin with Username doesn't exist");
        res.status(404).send(`Admin ${username} not registered`);
    } 
    const password_match = await bcrypt.compare(password, User.password);
    if(password_match) {
        req.session.regenerate( (error) => {
            if(error) {
                console.error(`Error regenerating session`);
                next(err);
            } else {
                req.session.user = Admin._Id;
                console.log(`Admin ${Admin.username} signin successful`)
                res.status(200).send(`logged in as ${Admin.username}`);
            }
        });   
    } else {
        console.log("Incorrect password signin failed.\n")
        res.status(401).send("incorrect password");
    }
})

adminRouter.post("/logout", (req, res ,next) => {
    
})

adminRouter.get("/mycourses", (req, res ,next) => {
    
})

export {
    adminRouter,
}