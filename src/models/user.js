import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name: {
        type: String,
        reqired: true
    },
    email: {
        type: String,
        unique: true,
        reqired: true
    },
    password: {
        type: String,
        reqired: true,
        select: false
    }
});

// mongoose.model = {};

export const User =  mongoose.models.User || mongoose.model("User", schema);