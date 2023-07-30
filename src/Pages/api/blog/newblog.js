import { Post } from "@/models/post";
import { checkAuth, dbConnect } from "@/utils/features"


export default async function handler (req, res) {

    if(req.method !== "POST") return res.status(404).json({
        message: "envalid method"
    })

    try {
        await dbConnect();

        const {title, description, image, author} = req.body;

        const user = await checkAuth(req);

       
       const blog =  await Post.create({
            title,
            description,
            image,
            author,
            authorId: user._id
        })

        return res.status(201).json({
            success: true,
            message: `blog crerated successfully`,
            blog
    })
    } catch (error) {
        return res.status(500).json("error in create blog");
    }
}