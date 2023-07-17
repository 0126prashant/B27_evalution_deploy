const jwt = require("jsonwebtoken")
const auth = async(req,res,next)=>{
      const token = req.headers.authorization?.split(" ")[1]
    try {
        if(token){
            const decoded = jwt.verify(token,process.env.secretKey)
            // console.log(decoded)
            req.userId = decoded.userId;
            req.name = decoded.name;
            next()
        }
    } catch (error) {
        res.status(400).send({error:error.message})
    }
}

 module.exports = {
    auth
 }