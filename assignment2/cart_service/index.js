const express = require("express");
const app = express();
const port = process.env.PORT || 9002;

app.use(express.json());

var cart = {};

app.put("/rest/v1/users/:uuid/cart", (req, res) => {
  let reqbody = req.body;
  const uuid = req.params.uuid;
  cart[uuid] = reqbody;
  console.log(reqbody);
  res.send(reqbody);
});

app.get("/rest/v1/users/:uuid/cart", (req, res) => {
  const uuid = req.params.uuid;
  let item = cart[uuid];
  console.log(item);
  res.send(item);
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
