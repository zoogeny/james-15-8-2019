const express = require("express");
const cors = require("cors");
const upload = require("./upload");
const deleteDocument = require("./delete");
const list = require("./list");
const search = require("./search");

const router = express.Router();

router.use(cors());

router.post("/upload", upload);
router.delete("/delete/:id", deleteDocument);
router.get("/list", list);
router.get("/search", search);

module.exports = router;
