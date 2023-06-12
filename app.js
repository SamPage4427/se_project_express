// PORT
const { PORT = 3001 } = process.env;

// Connect Express
const express = require("express");

const app = express();

// mongoose connection
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// User ID
app.use((req, res, next) => {
  req.user = {
    _id: "6484cd87755ff5940b282596",
  };
  next();
});

// Routes
const routes = require("./routes");

app.use(express.json());
app.use(routes);

// Listener
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
