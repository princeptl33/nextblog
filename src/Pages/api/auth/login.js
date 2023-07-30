import { User } from "@/models/user";
import { cookiesetter, dbConnect, generatetoken } from "@/utils/features"
import { trusted } from "mongoose";



export default async function handler(req, res) {
    if (req.method !== "POST" ) return res.status(404).json({
        message: 'envalid method'
    })

    try {
        await dbConnect();

        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user && !password) return res.status(500).json({
            message: "user dosen't  access"
        })

        const token = generatetoken(user._id);

        cookiesetter(res, token, true)

        res.status(200).json({
            success: true,
            message: `welcome back ${user.name}`,
            user
        })
    } catch (error) {
        res.status(500).json("error in loging")
    }
}