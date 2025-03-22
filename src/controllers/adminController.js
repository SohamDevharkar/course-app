import { adminModel } from "../models/admin";
import { courseModel } from "../models/course";
import zod from "zod";
import bcrypt from "bcrypt";

async function adminSignup(req, res, next) {

    const schema = Zod.object({
        email: zod.string().email().min(3),
        password: zod.string().min(3).max(16),
        firstName: zod.string().min(3),
        lastName: z.string().min(3)
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
        console.log(`invalid data format \nerror: ${result.error}`);
        return res.status(400).json({ message: "invalid data format", error: result.error });
    }

    const { email, password, firstName, lastName } = req.body;
    const hashedPassword = bcrypt.hash(password, 10);

    try {
        await adminModel.create({ email, password: hashedPassword, firstName, lastName });
        res.status(201).json({ message: "user signup successful" });
    } catch (error) {
        res.status(400).json({ error: "User already exists" });
        next(error);
    }
}

async function adminSignin(req, res, next) {
    const schema = zod.object({
        email: zod.string().email().min(5),
        password: zod.string().min(3).max(16)
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
        console.log("invalid data format during signin");
        return res.status(400).json({ message: "invalid data format", error: result.error });
    }

    const { email, password } = req.body;
    const admin = adminModel.findOne({ email: email });
    if (!admin) {
        console.log("Invalid Credentials");
        res.status(403).json({ error: "Invalid Credentials" });
    }
    const password_match = await bcrypt.compare(password, User.password);

    if (password_match) {
        req.session.regenerate((error) => {
            if (error) {
                console.error(`Error regenerating session`);
                next(err);
            } else {
                req.session.adminId = admin._Id;
                console.log(`Admin ${Admin.username} signin successful`)
                res.status(200).send(`logged in as ${Admin.username}`);
            }
        });
    } else {
        console.log("Incorrect password signin failed.\n")
        res.status(401).send("Invalid Credentials");
    }
}

async function createCourse(req, res, next) {
    const schema = zod.object({
        title: zod.string().min(3),
        description: zod.string().min(10),
        imageUrl: zod.string().url(),
        price: zod.number().positive()
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
        console.log("Invalid data format while creating course");
        return res.status(400).json({ message: "Incorrect data format", error: result.error });
    }

    const { title, description, imageUrl, price } = req.body;
    try {
        const course = await courseModel.create({ title, description, imageURL, price });
        res.status(201).json({ message: "Course created", courseId: course._id });
    } catch (err) {
        next(err);
    }

}

async function updateCourse(req, res, next) {
    const schema = zod.object({
        courseId: zod.string().min(5),
        title: zod.string().min(3).optional(),
        description: zod.string().min(5).optional(),
        imageURL: zod.string().url().optional(),
        price: zod.number().positive().optional()
    });

    const result = schema.safeParse(req.body);

    if (!result.success) {
        console.log(`Incorrect data format while updating courseId: ${req.courseId}`);
        return res.json({ message: `Incorrect data format, courseId: ${req.courseId}` });
    }

    const { courseId, title, description, imageUrl, price } = req.body;
    const course = await courseModel.findOne({ _id: courseId, creatorId: req.adminId });

    if (!course) {
        console.log("course not found");
        return res.status(400).json({ message: "Course not found" });
    }

    try {
        await courseModel.updateOne(
            { _id: courseId, creatorId: req.adminId },
            {
                title: title || course.title,
                description: description || course.description,
                imageURL: imageURL || course.imageURL.at,
                price: price || course.price
            });

        res.status(200).json({ message: "Course created" });
    } catch (err) {
        next(err);
    }


}

async function deleteCourse(req, res, next) {
    const schema = zod.object({
        courseId: zod.string().min(5),
    });
    const result = schema.safeParse(req.body);

    if (!result.success) {
        return res.json({ message: "Incorrect data format", error: result.error });
    }

    const { courseId } = req.body;

    try {
        const course = await courseModel.findOne({ _id: courseId, creatorId: req.adminId });

        if (!course) {
            return res.status(404).json({ message: "Course not Found" });
        }

        await courseModel.deleteOne({ _id: courseId, creatorId: req.adminId });
        res.status(200).jsson({ message: "Course deleted" });
    } catch (err) {

    }
}

async function getAllCourses(req, res, next) {
    try {
        const courses = await courseModel.find({ creatorId: req.adminId });
        res.status(200).json({ courses });
    } catch (err) {
        next(err)
    }
}

async function adminLogout(req, res, next) {
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            res.status(400).send("log out error");
        }
        else {
            req.session.clearCookie("connect.sid", { path: "/signin" });
            console.log("user logged out");
            res.status(200).send("User logged out");
        }
    });

}

export default {
    adminSignup,
    adminSignin,
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCourses,
    adminLogout
}


