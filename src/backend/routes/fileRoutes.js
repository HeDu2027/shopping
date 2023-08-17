const express = require('express');
const multer = require('multer');
const path = require('path');
const File = require('../models/File');

const router = express.Router();

const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/';

        // Check if directory exists, if not, create it
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});


const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    console.log("Received file upload request");

    if (!req.file) {
        console.error("No file received in the request");
        return res.status(400).json({ success: false, message: 'No file received' });
    }

    console.log("Attempting to save file to database...");

    try {
        const newFile = new File({ filePath: req.file.path });
        await newFile.save();
        console.log("File saved successfully");
        res.json({ success: true, filePath: req.file.path });
    } catch (error) {
        console.error("Error saving file to database:", error.message);
        res.status(500).json({ success: false, message: 'Failed to save file', error: error.message });
    }
});



module.exports = router;
