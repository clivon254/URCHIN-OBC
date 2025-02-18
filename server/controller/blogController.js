
import Blog from "../model/blogModel.js"
import { errorHandler } from "../utilis/error.js"


export const createPost = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not allowed to createBlog"))
    }

    const {title,description,images,category} = req.body

    if(!title || !description || !images || !category || title === "" || description === "" || category === "" || images === ""  )
    {
        return next(errorHandler(403,"Please fill up all the fields"))
    }

    try
    {
        const slug = req.body.title
                            .split(' ')
                            .join('-')
                            .toLowerCase()
                            .replace(/[^a-zA-Z0-9-]/g, '')

        const newBlog = new Blog({
            title,slug,description,
            images,category,
            userId:req.user.id
        })

        await newBlog.save()

        res.status(200).json({success:true , newBlog})

    }
    catch(error)
    {
        next(error)
    }

}


export const getPost = async (req,res,next) => {

    const {slug} = req.params

    try
    {
        const blog = await Blog.findOne({slug})
                                .populate({path:"userId"})

        if(!blog)
        {
            return next(errorHandler(404, "blog not found"))
        }

        res.status(200).json({success:true ,blog})

    }
    catch(error)
    {
        next(error)
    }

}


export const getPosts = async (req,res,next) => {

    try
    {
        const blogs = await Blog.find({}).sort({_id:-1})

        res.status(200).json({success:true , blogs})

    }
    catch(error)
    {
        next(error)
    }

}


export const updatePost = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not to update the blog"))
    }

    const {blogId} = req.params

    const blog = await Blog.findById(blogId)

    if(!blog)
    {
        return next(errorHandler(404 ,"blog not found"))
    }

    try
    {
        
        const updatedPost = await Blog.findByIdAndUpdate(blogId ,
            {
                $set:{
                    title:req.body.title ,
                    description:req.body.description ,
                    category:req.body.category ,
                    status:req.body.status ,
                    images:req.body.images ,
                }
            },
            {new:true}
        )

        res.status(200).json({success:true , updatedPost})

    }
    catch(error)
    {
        next(error)
    }

}


export const deletePost = async (req,res,next) => {

    if(!req.user.isAdmin)
    {
        return next(errorHandler(403,"You are not to update the blog"))
    }

    const {blogId} = req.params

    const blog = await Blog.findById(blogId)

    if(!blog)
    {
        return next(errorHandler(404 ,"blog not found"))
    }

    try
    {
        await Blog.findByIdAndDelete(blogId)

        res.status(200).json({success:true , message:`${blog.title} is deleted successfully`})

    }
    catch(error)
    {
        next(error)
    }

}