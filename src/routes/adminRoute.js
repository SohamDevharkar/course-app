import { Router } from "express";
import bcrypt  from "bcrypt";
import { adminModel, courseModel } from "../../db/db";
import { validationMiddleware, signupValidationObject, signinValidationObject } from "../validation/validation";
import { auth } from "../middlewares/authenitcation";
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
    })
})

adminRouter.post("/createcourse", auth,  async (req, res ,next) => {
    const adminId =  req.session.userId;
    const { title, description, price, imageUrl } = req.body;
    const course  = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageURL: imageUrl,
        creatorId: adminId
    });
    console.log(`course created Id: ${course._Id}`);
    res.status(200).json({message: `course with id: ${course._Id} created`});
});
export {
    adminRouter,
}