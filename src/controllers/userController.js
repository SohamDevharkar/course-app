import { userModel } from "../models/user.js"
import { purchaseModel } from "../models/purchase.js";
import { courseModel } from "../models/course.js";
import bcrypt from "bcrypt";
import zod from "zod";

async function userSignup(req, res, next) {

    const schema = zod.object({
        email: zod.string().email().min(5),
        password: zod.string().min(3).max(16),
        firstName: zod.string().min(3),
        lastName: zod.string().min(3)
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
        console.log("Incorrect data format while User signup");
        return res.status(400).json({
            message: "Incorrect data format",
            error: result.error
        })
    }
    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await userModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        })
        console.log("User signup successful.\n")
        res.status(201).json({ message: "User signup successful." });
    } catch (err) {
        if (err.code === 11000) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists" });
        }
        next(err);
    }
}

async function userSignin(req, res, next) {

    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(3).max(16),
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
        console.log("Incorrect data format while User signup");
        return res.status(400).json({
            message: "Incorrect data format",
            error: result.error
        });
    }

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        
        if (!user) {
            console.log("Incorrect credentials");
            return res.status(403).send("Incorrect Credentials");
        }

        const password_match = await bcrypt.compare(password, user.password);

        if (password_match) {
            req.session.regenerate((error) => {
                if (error) {
                    console.error(`Error regenerating session`);
                    next(err);
                } else {
                    req.session.userId = user._id;
                    console.log(`user ${user.firstName} ${user.lastName} signin successful`)
                    res.status(200).json({ message: `logged in as ${user.firstName} ${user.lastName}` });
                }
            });
        } else {
            console.log("Incorrect Credentials\n")
            res.status(403).json({ message: "Incorrect Credentials" });
        }
    } catch (err) {
        next(err);
    }
}

async function userSignout(req, res, next) {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(400).send("log out error");
        }
        else {
            res.clearCookie("connect.sid", { path: "/signin" });
            console.log("user logged out");
            res.status(200).json({ message: "User logged out" });
        }
    });
}

async function getUserPurchases(req, res, next) {
    const userId = req.session.userId;

    if (!userId) {
        return res.status(401).json({
            message: "Unauthorized access",
        });
    }

    try {
        const purchases = await purchaseModel.find({ userId });
        console.log(`purchases: ${purchases}`);
        if (!purchases.length) {
            return res.status(404).json({
                message: "No purchases found"
            })
        }

        const purchaseCourseIds = purchases.map(purchase => purchase.courseId);
        console.log(`purchaseCourseIds: ${purchaseCourseIds}`)
        const courseData = await courseModel.find({ _id: { $in: purchaseCourseIds } });
        console.log(`courseData: ${courseData}`)
        res.status(200).json({
            purchases,
            courseData
        });
    } catch (err) {
        next(err);
    }
}

export default {
    userSignup,
    userSignin,
    userSignout,
    getUserPurchases
}