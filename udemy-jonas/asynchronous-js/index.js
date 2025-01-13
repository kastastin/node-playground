const fs = require("fs");
const superagent = require("superagent");

function readFilePromise(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("File not found!");
      resolve(data);
    });
  });
}

function writeFilePromise(file, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("File could not be written!");
      resolve("Success");
    });
  });
}

readFilePromise(`${__dirname}/dog1.txt`)
  .then((res) => {
    console.log(`Breed: ${res}`);
    return superagent.get(`https://dog.ceo/api/breed/${res}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePromise("dog-img.txt", res.body.message);
  })
  .then(() => console.log("Image saved to file!"))
  .catch((err) => {
    console.log(err);
  });
