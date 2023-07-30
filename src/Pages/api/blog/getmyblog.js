import { Post } from "@/models/post";
import { checkAuth } from "@/utils/features";



export default async function handler(req, res){
    if(req.method !== "GET") return res.status(404).json("envalid method");

    try {
        const user = await checkAuth(req);

        if(!user) return res.status(500).json("user dosen't exist")

        const blog = await Post.find({authorId : user._id});

        return res.status(200).json({
            success: true,  
            blog
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}
