import { User } from "@/models/user";
import { dbConnect } from "@/utils/features";





export default async function handler (req, res) {
    if(req.method !== "POST") return res.status(404).json({
        message: "envalid method"
    })
    try {
        await dbConnect();

    const {name, email, password} = req.body;
    const user = await User.create({
        name,
        email,
        password
    })

    res.status(201).json({
        success: true,
        message: "reister successfully",
        user
    })
    } catch (error) {
        res.status(501).json(error.message);
    }
}