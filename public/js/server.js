const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/teachers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
    console.log("Connected to MongoDB");
});

// Teacher model
const Teacher = mongoose.model("Teacher", {
    college: String,
    employeeNumber: String,
    name: String,
    academicYear: String,
    semester: String,
    rank: String,
    order: Number,
});

app.use(bodyParser.json());

// Route to get all teachers
app.get("/teachers", async (req, res) => {
    try {
        const teachers = await Teacher.find({});
        res.json(teachers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
