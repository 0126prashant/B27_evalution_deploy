const express = require("express")
const { PostModel } = require("../model/post.model")
const { auth } = require("../middleware/authmiddleware")
const postRouter = express.Router()



// /posts

postRouter.use(auth)
postRouter.post("/add",async(req,res)=>{
    const {title,body,device} = req.body
    try {
        const post = await PostModel.create({title,body,device,creatorName:req.name,creatorId:req.userId})
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})
postRouter.get("/",async(req,res)=>{

    // creatorName:req.name,creatorId:req.userId
    try {
        const post = await PostModel.find({creatorId:req.userId})
        res.status(200).send(post)
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})
postRouter.patch("/update/:id",async(req,res)=>{
    try {
        const post = await PostModel.findById(req.params.id)
        // res.status(200).send(post)
        // console.log(post)
        // console.log(post.creatorId.toString() )
        // console.log(req.userId)
        if(post.creatorId.toString() !== req.userId){
            res.status(200).send({msg:"You have to Authorized first"})
        }
        else{
            const updatedPost = await PostModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
            res.status(200).send(updatedPost)
        }
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})







module.exports = {
    postRouter
}