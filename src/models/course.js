import mongoose, { Schema } from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const courseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageURL: String,
    creatorId: ObjectId // references to admin Schema object id.
});

export const courseModel = mongoose.model("course", courseSchema);