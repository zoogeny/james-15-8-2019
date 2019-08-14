const fs = require("fs");
const { getDocumentById, removeDocument } = require("../data/document");

const deleteDocument = async (req, res) => {
    const requestId = req.params.id;

    let documentToDelete;
    try {
        documentToDelete = await getDocumentById(requestId);
    } catch(error) {
        res.status(500)
        res.json({
            "error": `Unable to retrieve document data: ${ error }`
        });
        return;
    }

    try {
        fs.unlinkSync(documentToDelete.path);
    } catch(error) {
        console.error(`File ${ documentToDelete.path } already missing from filesystem`);
    }

    try {
        // delete from database
        removeDocument(requestId);
    } catch(error) {
        res.status(500)
        res.json({
            "error": `Unable to delete document: ${ error }`
        });
        return;
    }

    res.json({
        "error": null,
        id: requestId
    });
}

module.exports = deleteDocument;
