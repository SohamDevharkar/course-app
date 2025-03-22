import mongoose, { Schema } from "mongoose";

const ObjectId = mongoose.Types.ObjectId;

const purchaseSchema = new Schema({
    userId: ObjectId,
    courseId: ObjectId
});

export const purchaseModel = mongoose.model("purchases", purchaseSchema);