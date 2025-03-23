import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: {type: String, unique: true},
    password: String,
    firstName: String,
    lastName: String
})

export const userModel = mongoose.model("user", userSchema);