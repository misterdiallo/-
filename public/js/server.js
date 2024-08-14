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

const jsonFilePath = path.join(__dirname, '../data/源数据.json');

app.post('/update-data', (req, res) => {
    const newData = req.body;

    fs.readFile(jsonFilePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading data file.');
        }

        let jsonData = JSON.parse(data);

        // Append new data
        jsonData = jsonData.concat(newData);

        fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).send('Error writing data file.');
            }

            res.send('Data updated successfully.');
        });
    });
});


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
