import mongoose from "mongoose"

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        reqired: true
    },
    description : {
        type: String,
        reqired: true
    },
    image  : {
        type: String,
        required: true
    },
    author:{
        type: String,
        required: true
    },
    likes:{
        type: Number,
        default: 0
    },
    authorId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
})

export const Post =  mongoose.models.Post || mongoose.model("Post", PostSchema);