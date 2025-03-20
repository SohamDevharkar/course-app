import mongoose , { Schema } from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const userSchema = Schema({
    email: {type: String, unique: true},
    passowrd: String,
    firstName: String,
    lastName: String
});

const adminSchema = Schema({
    email: {type: String, unique: true},
    passowrd: String,
    firstName: String,
    lastName: String
});

const courseSchema = Schema({
    title: String,
    description: String,
    price: Number,
    imageURL: String,
    creatorId: ObjectId // references to admin Schema object id.
});

const purchaseSchema = Schema({
    userId: ObjectId,
    courseId: ObjectId
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

export {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
}

