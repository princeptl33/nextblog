import { Post } from "@/models/post";
import { checkAuth, dbConnect } from "@/utils/features";


export default async function handler (req, res){
    if(req.method !== "DELETE") return res.status(404).json("envalid method");

    const postId = await req.query.id;
    try {
        await dbConnect();


        const user = await checkAuth(req);

        if(!user) return res.json("not able to delete")

        const blog = await Post.findByIdAndDelete({_id: postId});

        res.status(201).json({
            success: true,
            message: "blog are deleted",
            blog
        })
        
    } catch (error) {
        return res.status(500).json(error.message);
    }
}