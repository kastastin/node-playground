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

async function getDogPic() {
  try {
    const data = await readFilePromise(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );
    console.log(res.body.message);

    await writeFilePromise("dog-img.txt", res.body.message);
    console.log("Image saved to file!");
  } catch (err) {
    console.log(err);
  }
}
getDogPic();
