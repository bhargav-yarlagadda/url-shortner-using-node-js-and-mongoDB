const shortid = require("shortid");  // Import shortid
const URL = require("../models/url"); // Import the URL model

const handleGenerateNewURL = async (req, res) => {
    const shortId = shortid.generate();  // Correctly generate a short ID using shortid.generate()
    const body = req.body;

    if (!body.url) {
        return res.status(400).json({
            error: "url is required"  // Return error if URL is not provided
        });
    }

    try {
        await URL.create({
            shortID: shortId,      // Use the generated shortId
            redirectURL: body.url, // Store the original URL
            visitHistory: []       // Initialize visit history as an empty array
        });

        return res.json({ id: shortId }); // Respond with the generated short ID
    } catch (error) {
        return res.status(500).json({
            error: "An error occurred while generating the URL"  // Handle any errors during creation
        });
    }
};


const handleGetAnalytics = async (req, res) => {
    const shortId = req.params.shortId;

    try {
        // Find the document by shortId
        const result = await URL.findOne({ shortID: shortId }); // Ensure field name matches schema

        // Check if the result is found
        if (result) {
            // Return the analytics data
            return res.json({
                totalClicks: result.visitHistory.length,
                analytics: result.visitHistory
            });
        } else {
            // Handle case where no document is found
            return res.status(404).json({ message: "Short URL not found" });
        }
    } catch (err) {
        // Handle any errors that occur
        console.error("Error retrieving analytics:", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    handleGenerateNewURL,
    handleGetAnalytics
};
