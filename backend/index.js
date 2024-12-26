const express = require("express");
const app = express();
const port = 5005;
const mongoDB = require("./db");

mongoDB();
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use("/api", require("./routes/createUser"));
app.use("/api", require("./routes/displayData"));
app.use("/api", require("./routes/orderData"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
