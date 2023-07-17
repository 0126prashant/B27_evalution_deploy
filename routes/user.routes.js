const express = require("express")
const { UserModel } = require("../model/register.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const userRouter = express.Router()


userRouter.post("/register",async(req,res)=>{
    const {email,password} = req.body
    try {
        const userExist = await UserModel.find({email})
        if(userExist.length){
              res.status(400).send({err:"User is already Present please login"})
        }
        const hashPass = bcrypt.hashSync(password,10)
        const User = new UserModel({...req.body,password:hashPass})
        await User.save()
        res.status(200).send({msg:"Registration sucessfull"})
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})
userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body
    try {
        const userExist = await UserModel.findOne({email})
        if(userExist){
            // console.log(userExist.id)
            // console.log(userExist.name)
            bcrypt.compare(password, userExist.password, (err, result)=> {
               if(err){
                res.status(400).send({error:err.message})
               }
               const token = jwt.sign({userId:userExist.id,name:userExist.name},process.env.secretKey)
               if(token){
                res.status(200).send({msg:"Login Sucessfull",token})
               }
            });
        }
       
    } catch (error) {
        res.status(400).send({error:error.message})
    }
})

module.exports = {
    userRouter
}