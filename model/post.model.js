const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title : {type : String ,require:true},
    body: {type : String ,require:true},
    device: {type : String ,require:true},
    creatorName : {type : String},
    creatorId : {type : mongoose.Schema.Types.ObjectId,ref:"users"}
})


const PostModel = mongoose.model("post",postSchema) 
module.exports = {
    PostModel
}