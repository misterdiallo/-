const express = require("express");
const path = require("path");
const multer = require("multer");
const xlsx = require("xlsx");

const app = express();
const PORT = process.env.PORT || 3000;

// Set storage engine for multer
const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});

// Initialize multer upload
const upload = multer({
    storage: storage,
});

// Serve static files (CSS, JS, images, etc.) from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Route for uploading Excel file
app.post("/upload", upload.single("excelFile"), (req, res) => {
    if (!req.file) {
        return res.status(400).send("No file uploaded");
    }

    res.send("File uploaded successfully");
});

// Route for reading uploaded Excel file
app.get("/read", (req, res) => {
    // Load the uploaded Excel file
    const workbook = xlsx.readFile("./uploads/" + req.query.filename);
    // Assuming there's only one sheet in the Excel file
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    // Convert the worksheet to JSON object
    const data = xlsx.utils.sheet_to_json(worksheet);

    res.json(data);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/test", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "test.html"));
});
app.get("/extract", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "extract.html"));
});
app.get("/work", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "work.html"));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
