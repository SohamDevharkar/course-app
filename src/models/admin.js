import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})

export const adminModel = mongoose.model("admin", adminSchema);
