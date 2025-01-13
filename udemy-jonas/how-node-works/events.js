const http = require("http");
const EventEmitter = require("events");

class Sales extends EventEmitter {
  constructor() {
    super();
  }
}

const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log("There was a new sale!");
});

myEmitter.on("newSale", () => {
  console.log("Customer name: Bob");
});

myEmitter.on("newSale", (stock) => {
  console.log("Stock: " + stock);
});

myEmitter.emit("newSale", 12);

// <-- Server -->

const server = http.createServer();

server.on("request", (req, res) => {
  console.log("Request received!");
  res.end("Request received!");
});

server.on("request", (req, res) => {
  console.log("Another request!");
});

server.on("close", () => {
  console.log("Server closed!");
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Waiting for requests...");
});
