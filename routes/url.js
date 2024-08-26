const express = require("express")
const router = express.Router()
const  {handleGenerateNewURL,handleGetAnalytics} = require("../controllers/url")


router.post("/",handleGenerateNewURL)
router.get("/analytics/:shortId",handleGetAnalytics)
module.exports = router