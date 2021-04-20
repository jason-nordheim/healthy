// node modules
const express = require("express");
const cors = require("cors");
const {
  userRouter,
  foodRouter,
  exerciseRouter,
  weightRouter,
} = require("./routes");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/users", userRouter);
app.use("/api/foods", foodRouter);
app.use("/api/weights", weightRouter);
app.use("/api/exercise", exerciseRouter);

module.exports = app;
