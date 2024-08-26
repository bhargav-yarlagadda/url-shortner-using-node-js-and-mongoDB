const  mongoose = require("mongoose")

const connectToMongoDB = async (url)=>{
    return mongoose.connect(url)
}
module.exports={
    connectToMongoDB
}