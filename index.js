const express = require("express")
const app = express()
const PORT = 3000
const urlRoute = require("./routes/url")
const {connectToMongoDB }=require("./connect")
const URL = require("./models/url")
connectToMongoDB("mongodb://127.0.0.1:27017/shortURL")
.then(()=>{
    console.log("connected to db")
})
.catch(()=>{
    console.log("error in connecting to Data Base")
})

app.use(express.json())

app.use("/url",urlRoute)

app.get("/:shortId",async (req,res)=>{
    const shortId = req.params.shortId
    const entry = await URL.findOneAndUpdate({
        shortID:shortId
    },{
        $push:{
            visitHistory:{
                timeStamp:Date.now()
            },
        }
    })
    res.redirect( entry.redirectURL )
})


app.listen(PORT,()=>{
    console.log("server started on port:",PORT)
})