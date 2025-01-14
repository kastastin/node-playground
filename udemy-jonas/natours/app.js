const fs = require("fs");
const express = require("express");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

const app = express();

// <-- MIDDLEWARE -->
app.use(express.json());

// <-- GET tours -->
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
});

// <-- POST tours -->
app.post("/api/v1/tours", (req, res) => {
  const newId = tours.at(-1).id + 1;
  const newTour = { id: newId, ...req.body };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: { tour: newTour },
      });
    },
  );
});

app.listen(3000, () => {
  console.log("App running on port 3000...");
});
