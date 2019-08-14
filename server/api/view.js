const fs = require("fs");
const { getDocumentById } = require("../data/document");

const view = async (req, res) => {
    const requestId = req.params.id;

    let documentToView;
    try {
        documentToView = await getDocumentById(requestId);
    } catch(error) {
        res.status(500)
        res.json({
            "error": `Unable to retrieve document data: ${ error }`
        });
        return;
    }

    if (!documentToView) {
        res.status(404);
        res.json({
            "error": `Unable to retrieve document for id: ${ requestId }`
        });
        return;
    }

    const fileStream = fs.createReadStream(documentToView.path);
    res.status(200);
    res.setHeader("Content-Type", documentToView.mimetype);
    res.setHeader("Cache-Control", "public, max-age=30");
    fileStream.pipe(res);
}

module.exports = view;
