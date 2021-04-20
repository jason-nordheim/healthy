const { mongoClient } = require("../config/config.mongoose");
const weightSchema = require("./schema.weight");
const foodSchema = require("./schema.food");
const exerciseSchema = require("./schema.exercise");
const userSchema = require("./schema.user");

const User = mongoClient.model("user", userSchema);
const Exercise = mongoClient.model("exercise", exerciseSchema);
const Food = mongoClient.model("food", foodSchema);
const Weight = mongoClient.model("weight", weightSchema);

module.exports = {
  User,
  Exercise,
  Food,
  Weight,
};
