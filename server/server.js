const express = require("express");
const bodyParser = require("body-parser");
const uuidv4 = require("uuid/v4");

const app = express();
const port = 4567;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

let items = [];

app.get("/items.json", (_, res) => res.json(items));

app.post("/items.json", (req, res) => {
  const { item } = req.body;
  items.push({
    id: uuidv4(),
    item
  });
  res.json(items);
});

app.delete("/items.json", (req, res) => {
  items = items.filter(item => item.id !== req.body.id);
  res.json(items);
});

app.listen(port, () => console.log(`Todo server listening on port ${port}!`));
