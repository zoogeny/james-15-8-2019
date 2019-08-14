const search = (req, res) => {
    const searchTerm = req.query.term;
    res.json({
        "documents": [
            {
                "id": "1234",
                "title": "Doc1",
                "size": "1024000"
            }
        ]
    });
};

module.exports = search;
