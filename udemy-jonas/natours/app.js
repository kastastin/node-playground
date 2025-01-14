const fs = require("fs");
const express = require("express");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

const app = express();

// <-- MIDDLEWARE -->
app.use(express.json());

function getAllTours(req, res) {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
}

function getTour(req, res) {
  const tour = tours.find((t) => t.id === Number(req.params.id));

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "ID not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: { tour },
  });
}

function createTour(req, res) {
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
}

function updateTour(req, res) {
  const tour = tours.find((t) => t.id === Number(req.params.id));

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "ID not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: { tour: "<Updated tour>" },
  });
}

function deleteTour(req, res) {
  const tour = tours.find((t) => t.id === Number(req.params.id));

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "ID not found",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
}

// prettier-ignore
app
  .route("/api/v1/tours")
  .get(getAllTours)
  .post(createTour);

app
  .route("/api/v1/tours/:id")
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

app.listen(3000, () => {
  console.log("App running on port 3000...");
});
