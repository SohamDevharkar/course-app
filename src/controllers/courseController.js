import { purchaseModel } from "../models/purchase.js";
import { courseModel } from "../models/course.js";

async function purchaseCourse(req, res, next) {
    const userId = req.session.userId;
    const courseId = req.body.courseId;

    if(!courseId) {
        console.log("Please provide courseId");
        return res.status(400).json({
            message: "Please provide a courseId"
        })
    }

    try {
        const existingPurchase = await purchaseModel.findOne({
            courseId: courseId,
            userId: userId
        });

        if(existingPurchase) {
            console.log("You have already bought this course");
            return res.status(400).json({
                message: "You have already bought this course",
            });
        }

        await purchaseModel.create({
            courseId: courseId,
            userId: userId
        });

        console.log("You have successfully bought the course")

        res.status(201).json({
            message: "You have successfully bought the course"
        });
    } catch (err) {
        console.log("An error occurred while processing the purchase");
        next(err)
    }
}

async function previewCourses(req, res) {
    try{
        const courses = await courseModel.find({});
        res.status(200).json({
            courses: courses
        });
    } catch (err) {
        console.log("An error occurred while fetching courses.")
        next(err);
    }
} 

export default { purchaseCourse, previewCourses};