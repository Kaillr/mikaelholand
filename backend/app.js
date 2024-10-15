const express = require("express");
const path = require("path");

const app = express();
const port = 3001;

app.use((req, res, next) => {
    if (req.path !== '/' && req.path.endsWith('/')) {
      const newPath = req.path.slice(0, -1); // Remove trailing slash
      return res.redirect(301, newPath + (req.url.slice(req.path.length) || ''));
    }
    next();
  });

// Serve the frontend folder as static files
app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "index.html"));
});

app.get("/aboutme", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "aboutme.html"));
});

app.get("/portfolio", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "portfolio.html"));
});


app.listen(port, () => {
    console.log("Server is running on port " + port);
});
