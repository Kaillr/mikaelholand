const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

// Serve the frontend folder as static files
app.use(express.static(path.join(__dirname, "frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.get("/aboutme", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "aboutme.html"));
});

app.get("/portfolio", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "portfolio.html"));
});


app.listen(port, () => {
    console.log("Server is running on port " + port);
});
