const multer  = require("multer");
const readChunk = require('read-chunk');
const fileType = require('file-type');
const fs = require("fs");
const { addDocument } = require("../data/document");

const uploadMiddleware = multer({ dest: "uploads/" });

const ALLOWED_TYPES = {
    "image/jpeg": true,
    "image/png": true
};

const MAX_SIZE = 10 * 1024 * 1024;

const cleanTempFile = (file) => {
    fs.unlink(file.path, err => {
        if (err) {
            console.error("Unable to delete file: ", err);
        }
    });
}

const upload = async (req, res) => {
    const file = req.file;

    if (!(file.mimetype in ALLOWED_TYPES)) {
        res.status(415)
        res.json({
            "error": `Unsupported media type ${ file.mimetype }`
        });
        cleanTempFile(file);
        return;
    }

    const buffer = readChunk.sync(file.path, 0, fileType.minimumBytes);
    const detectedFileType = fileType(buffer);
    if (!(detectedFileType.mime in ALLOWED_TYPES)) {
        res.status(415)
        res.json({
            "error": `Unsupported media type ${ detectedFileType.mime }`
        });
        cleanTempFile(file);
        return;
    }

    if (file.size > MAX_SIZE) {
        res.status(413)
        res.json({
            "error": "File size too large"
        });
        cleanTempFile(file);
        return;
    }

    let id;
    try {
        id = await addDocument(file.originalname, file.path, file.size);
    } catch(error) {
        res.status(500)
        res.json({
            "error": `Unable to add document to data store: ${ error }`
        });
        cleanTempFile(file);
        return;
    }

    res.json({
        error: null,
        id,
        title: file.originalname,
        size: file.size,
    });
}

module.exports = [ uploadMiddleware.single("upload"), upload ];
