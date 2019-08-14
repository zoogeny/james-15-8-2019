const { searchDocuments } = require("../data/document");

const search = async (req, res) => {
    const searchTerm = req.query.term;

    let documents;
    try {
        documents = await searchDocuments(searchTerm);
    } catch(error) {
        res.status(500);
        res.json({
            error: `Unable to search for documents: ${ error }`
        });
        return;
    }

    res.json({
        error: null,
        documents
    });
};

module.exports = search;
