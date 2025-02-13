const fs = require("fs");
const url = require("url");
const http = require("http");

const slugify = require("slugify");

const replaceTemplate = require("./modules/replaceTemplate");

const products = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productsObj = JSON.parse(products);

const slugs = productsObj.map((el) => slugify(el.productName, { lower: true }));

const templateOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8",
);
const templateCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8",
);
const templateProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8",
);

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);

  // <-- Overview page -->
  if (pathname === "/" || pathname === "/overview") {
    const cardsHTML = productsObj
      .map((el) => replaceTemplate(templateCard, el))
      .join("");
    const output = templateOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);

    res.writeHead(200, { "Content-type": "text/html" });
    res.end(output);

    // <-- Product page -->
  } else if (pathname === "/product") {
    const product = productsObj[query.id];
    const output = replaceTemplate(templateProduct, product);

    res.writeHead(200, { "Content-type": "text/html" });
    res.end(output);

    // <-- API -->
  } else if (pathname === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(products);

    // <-- Not found Page -->
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
