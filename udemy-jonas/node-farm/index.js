const fs = require("fs");

// Blocking code execution (synchronous way)
// const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// const textOut = `About avocado: ${textIn}.\nCreated on ${new Date()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written.");

// Non-blocking (asynchronous way)
fs.readFile("./txt/start.txt", "utf-8", (err, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (err, data2) => {
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        if (err) return console.log("Error writing file.");
        console.log("File has been written.");
      });
    });
  });
});
console.log("Start reading file...");
