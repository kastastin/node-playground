const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    app: "Natours",
    message: "Hello from the server side!",
  });
});

app.post("/", (req, res) => {
  res.send("You can post to this endpoint...");
});

app.listen(3000, () => {
  console.log("App running on port 3000...");
});
