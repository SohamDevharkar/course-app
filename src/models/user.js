import { Schema } from "mongoose";

const userSchema = new Schema({
    email: {type: String, unique: true},
    passowrd: String,
    firstName: String,
    lastName: String
})

export const userModel = mongoose.model("user", userSchema);