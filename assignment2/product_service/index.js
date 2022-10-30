const express = require("express");
const app = express();
const port = process.env.PORT || 9001;

let products = [
  {
    productId: "12445dsd234",
    category: "Modile",
    productName: "Samsung",
    productModel: "GalaxyNote",
    price: 700,
    availableQuantity: 10,
  },
  {
    productId: "123245ds4234",
    category: "TV",
    productName: "Sony",
    productModel: "Bravia",
    price: 1200,
    availableQuantity: 6,
  },
];

app.get("/rest/v1/products", (req, res) => {
  res.send(products);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
