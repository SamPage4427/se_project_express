// PORT
const { PORT = 3001 } = process.env;

// Connect Express
const express = require("express");

const app = express();

// mongoose connection
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

const cors = require("cors");

app.use(cors);

// Routes
const routes = require("./routes");

app.use(express.json());
app.use(routes);

// Listener
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
