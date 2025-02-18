

import express from "express"
import { createPost, deletePost, getPost, getPosts, updatePost } from "../controller/blogController.js"
import { verifyToken } from "../utilis/verify.js"


const blogRouter = express.Router()


blogRouter.post('/create-blog',verifyToken , createPost)


blogRouter.get('/get-blog/:slug', getPost)


blogRouter.get('/get-blog', getPosts)


blogRouter.put('/update-blog/:blogId', verifyToken, updatePost)


blogRouter.delete('/delete-blog/:blogId',verifyToken, deletePost)



export default blogRouter