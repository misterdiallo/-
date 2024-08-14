const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.json({ limit: '80mb' })); // Increase the limit to 50 MB
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from 'public' directory

const jsonFilePath = path.join(__dirname, 'public/data/源数据.json');

// API Endpoint to Update Data
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

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
