// PORT
require("dotenv").config();

const { PORT = 3001 } = process.env;

// Connect Express
const express = require("express");

const app = express();

// mongoose connection
const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

// CORS
const cors = require("cors");

app.use(cors());

const { errors } = require("celebrate");

// Request and Error loggers
const { requestLogger, errorLogger } = require("./middlewares/logger");

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

// Routes
const routes = require("./routes");

app.use(express.json());
app.use(routes);

// Errors
app.use(errorLogger);

app.use(errors());

const errorHandler = require("./middlewares/error-handler");

app.use(errorHandler);

// Listener
app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`);
});
