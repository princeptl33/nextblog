import { Post } from "@/models/post";
import { dbConnect } from "@/utils/features";



export default async function handler (req, res){
    if(req.method !== "GET") return res.status(404).json({
        message: "envalid method"
    });


    const postId = await req.query.id;

    try {
        await dbConnect();

        const blog = await Post.findById(postId);

        return res.status(200).json({
            success: true,
            blog
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
}