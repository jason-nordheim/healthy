const mongoose = require("mongoose");

const { mongo_url } = require("./app.config");

const weightSchema = require("./schema.weight");
const foodSchema = require("./schema.food");
const exerciseSchema = require("./schema.exercise");
const userSchema = require("./schema.user");

const mongooseClient = new mongoose.Mongoose();

mongooseClient.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongooseClient.connection;
connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", () => console.info("Database Connection established"));

const User = mongooseClient.model("user", userSchema);
const Exercise = mongooseClient.model("exercise", exerciseSchema);
const Food = mongooseClient.model("food", foodSchema);
const Weight = mongooseClient.model("weight", weightSchema);

module.exports = {
  User,
  Exercise,
  Food,
  Weight,
};
