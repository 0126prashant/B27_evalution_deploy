const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { postRouter } = require("./routes/post.routes")


const app = express()
app.use(express.json())
require("dotenv").config()

// app.get("/get",(req,res)=>{
//     res.send("Hello welcome to Homepage")
// })

app.use("/users",userRouter)
app.use("/posts",postRouter)

app.listen(process.env.PORT,async()=>{
    try {
        await connection
        console.log("Connected to db")
    } catch (error) {
        console.log(error)
    }
    console.log(`Port is Ruuning at ${process.env.PORT}`)
})