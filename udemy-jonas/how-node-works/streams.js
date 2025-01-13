const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  // <-- Solution 1: Load the entire file into memory -->
  // fs.readFile("test-file.txt", (err, data) => {
  //   if (err) console.log(err);
  //   res.end(data);
  // });

  // <-- Solution 2: Streams -->
  // Back pressure: When the response is slower than the incoming data
  // const readable = fs.createReadStream("test-file.txt");
  // readable.on("data", (chunk) => res.write(chunk));
  // readable.on("end", () => res.end());
  // readable.on("error", (err) => {
  //   console.log(err);
  //   res.statusCode = 500;
  //   res.end("File not found");
  // });

  // <-- Solution 3: Pipe operator -->
  const readable = fs.createReadStream("test-file.txt");
  readable.pipe(res);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Listening on port 8000");
});
