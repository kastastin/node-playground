const fs = require("fs");
const http = require("http");

const products = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");

const server = http.createServer((req, res) => {
  const pathname = req.url;

  if (pathname === "/" || pathname === "/overview") {
    res.end("This is the OVERVIEW");
  } else if (pathname === "/product") {
    res.end("This is the PRODUCT");
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(products);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "custom-header": "custom-header",
    });
    res.end("<h1>Page not found!</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server is listening on port 8000");
});
