import jwt from "jsonwebtoken";
import { serialize } from "cookie";



import mongoose from "mongoose"
import { User } from "@/models/user";

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    throw new Error(
        "Please define the MONGODB_URI environment variable inside .env.local"
    )
}


let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = {con: null, promise: null}
}

export const dbConnect = async () => {
    if (cached.conn) {
        return cached.conn;
    }


// If a connection does not exist, we check if a promise is already in progress. If a promise is already in progress, we wait for it to resolve to get the connection
    if (!cached.promise) {
        const opts = {
            bufferCommands : false
        };

        cached.promise = mongoose.connect(MONGODB_URL, opts).then((mongoose) => {
            return mongoose
        })
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}


export const generatetoken= (_id) => {
    return jwt.sign({_id}, process.env.JWT_KEY)
}

export const cookiesetter = (res, token, set) => {
    res.setHeader(
        "Set-Cookie",
        serialize("token", set ? token : "",{
            path: "/",
            httpOnly: true,
            maxAge: set ? 15 * 24 * 60 * 60 * 1000 : 0,
        })
    )
}


export const checkAuth = async (req) => {
    const cookie = req.headers.cookie;
    if (!cookie) return null;
  
    const token = cookie.split("=")[1];
  
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // console.log(decoded._id)
    return await User.findById(decoded._id);
     
  };