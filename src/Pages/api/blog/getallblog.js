import { Post } from "@/models/post";
import { dbConnect } from "@/utils/features";


export default async function handler(req, res){
    if(req.method !== "GET") return res.status(404).json({
        message: "Envalid Method"
    });

    try {
        await dbConnect();

        const getallblog = await Post.find({});

        // console.log(author)

        res.status(200).json({
            success: true,
            getallblog,
        })
    } catch (error) {
        return res.status(500).json(error.message);
    }
    
}