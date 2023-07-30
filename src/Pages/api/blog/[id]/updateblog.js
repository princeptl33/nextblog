import { Post } from "@/models/post";
import { checkAuth, dbConnect } from "@/utils/features";


export default async function handler (req, res){
    if(req.method !== "PUT") return res.status(404).json("envalid method");

    const postId = await req.query.id;
    try {
        await dbConnect();


        const user = await checkAuth(req);

        if(!user) return res.json("not able to update")

        const blog = await Post.findByIdAndUpdate({_id: postId}, req.body, {
            new: true
        })

        res.status(201).json({
            success: true,
            blog
        })
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
}