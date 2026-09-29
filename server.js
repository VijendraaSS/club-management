const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(
    "mongodb://user_454q6extu:p454q6extu@db01.dbhost.dev:5050/db_454q6extu"
)
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.log("MongoDB connection error:", error);
});

// Schema
const memberSchema = new mongoose.Schema({
    memberId: String,
    name: String,
    department: String,
    year: Number,
    clubName: String,
    email: String
});

// Model
const Member = mongoose.model("Member", memberSchema);

// Home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Add member
app.post("/members", async (req, res) => {
    try {
        const member = new Member({
            memberId: req.body.memberId,
            name: req.body.name,
            department: req.body.department,
            year: req.body.year,
            clubName: req.body.clubName,
            email: req.body.email
        });

        await member.save();

        res.send("Club member added successfully!");
    } catch (error) {
        console.log(error);
        res.send("Error adding club member");
    }
});

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
