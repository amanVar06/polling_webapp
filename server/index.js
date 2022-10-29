require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes");
const handle = require("./handlers");
const connectDB = require("./config/dbConnection");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;

//Connect to mongoDB
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ hello: "world" }));
app.use("/api/auth", routes.auth);
app.use("/api/polls", routes.poll);

app.use(handle.notFound);
app.use(handle.errors);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, console.log(`Server started on port ${PORT}`));
});
