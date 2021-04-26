const { Router } = require("express");
const { Food } = require("../models");
const { authenticateUser, getUserId } = require("../middleware/authenticate");
const { searchFoods } = require("../util/edaman.api");

const foodRouter = Router();

// SEARCH
foodRouter.route("/search").get((req, res) => {
  searchFoods(req.query.query)
    .then((result) => res.status(200).json(result.data))
    .catch((error) => res.status(400).json(error));
});

// CREATE
foodRouter.route("/").post(authenticateUser, (req, res) => {
  const newFood = Food({
    ...req.body,
    userId: getUserId(req),
  });

  newFood
    .save()
    .then(() => res.status(201).json("Food saved"))
    .catch((error) => res.status(400).send(error));
});

// READ
foodRouter.route("/").get(authenticateUser, (req, res) => {
  Food.find({ userId: getUserId(req) })
    .then((foods) => res.json(foods))
    .catch((error) => res.status(400).json(error));
});

// READ
foodRouter.route("/:id").get(authenticateUser, (req, res) => {
  Food.findOne({ userId: getUserId(req), _id: req.params.id })
    .then((foods) => res.json(foods))
    .catch((error) => res.status(400).json(error));
});

// UPDATE
foodRouter.route("/:id").patch(authenticateUser, (req, res) => {
  Food.updateOne(
    { _id: req.params.id, userId: getUserId(req) },
    { ...req.body, nutrients: { ...req.body.nutrients } }
  )
    .then(() => res.status(200).json("Food updated"))
    .catch((error) => res.status(400).json(error));
});

// DELETE
foodRouter.route("/:id").delete(authenticateUser, (req, res) => {
  Food.deleteOne({ _id: req.params.id, userId: getUserId(req) })
    .then(() => res.status(200).json("Food deleted"))
    .catch((error) => res.status(400).json(error));
});

module.exports = foodRouter;
