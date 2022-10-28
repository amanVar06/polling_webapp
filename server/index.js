require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes");
const handle = require("./handlers");
const connectDB = require("./config/dbConnection");
const PORT = process.env.PORT || 4000;

//Connect to mongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ hello: "world" }));

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;

  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    err: err.message || "Something went wrong",
  });
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, console.log(`Server started on port ${PORT}`));
});
