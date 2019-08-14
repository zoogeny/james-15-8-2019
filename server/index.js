const express = require("express");
const path = require("path");
const api = require("./api");

const app = express();
const PORT = process.env.PORT || 4000;

// serve static files
app.use(express.static(path.join(__dirname, "..", "build/")));

// serve client app
app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

// add API
app.use("/api", api);

app.listen(PORT, () => {
  console.log(`Check out the app at http://localhost:${PORT}`);
});
