import { Post } from "@/models/post";
import { checkAuth, dbConnect } from "@/utils/features";



export default async function handler (req, res) {
    

    const postId = req.query.id;
    // console.log(postid)


    if(req.method !== "POST") return res.json("wrong method")

    try {
        await dbConnect()
       const post = await Post.findById(postId);

       if(!post) return res.status(404).json("post not availabe");

       post.likes++;

       post.save();

       return res.status(200).json({
        success: true,
        message: "like are counted"
       });
    } catch (error) {
        return res.status(500).json(error.message);
    }
}