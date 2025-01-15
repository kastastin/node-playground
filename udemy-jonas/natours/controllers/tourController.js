const fs = require("fs");

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);

function getAllTours(req, res) {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: { tours },
  });
}

function getTour(req, res) {
  const tour = tours.find((t) => t.id === Number(req.params.id));

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
    `${__dirname}/../dev-data/data/tours-simple.json`,
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
  res.status(200).json({
    status: "success",
    data: { tour: "<Updated tour>" },
  });
}

function deleteTour(req, res) {
  res.status(204).json({
    status: "success",
    data: null,
  });
}

function checkId(req, res, next, value) {
  const tour = tours.find((t) => t.id === Number(req.params.id));

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "ID not found",
    });
  }

  next();
}

function checkBody(req, res, next) {
  console.log(!req.body.name, req.body.name);
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: "fail",
      message: "Name or price is missing",
    });
  }

  next();
}

module.exports = {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkId,
  checkBody,
};
