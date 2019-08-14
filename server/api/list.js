const { getAllDocuments } = require("../data/document");

const list = async (req, res) => {
    let documents;
    try {
        documents = await getAllDocuments();
    } catch (error) {
        res.status(500)
        res.json({
            "error": `Unable to fetch document list: ${ error }`
        });
        return;
    }

    res.json({
        error: null,
        documents
    });
};

module.exports = list;
