const { Router } = require("express");
const { Exercise } = require("../models");
const { authenticateUser, getUserId } = require("../middleware/authenticate");

const exerciseRouter = Router();

// CREATE
exerciseRouter.route("/").post(authenticateUser, (req, res) => {
  const newFood = Exercise({
    ...req.body,
    userId: getUserId(req),
  });

  newFood
    .save()
    .then(() => res.status(201).send("Food saved"))
    .catch((error) => res.status(400).send(error));
});

// READ
exerciseRouter.route("/").get(authenticateUser, (req, res) => {
  Exercise.find({ userId: getUserId(req) })
    .then((foods) => res.json(foods))
    .catch((error) => res.status(400).json(error));
});

// UPDATE
exerciseRouter.route("/:id").patch(authenticateUser, (req, res) => {
  Exercise.updateOne(
    { _id: req.params.id, userId: getUserId(req) },
    { ...req.body }
  )
    .then(() => res.status(200).send("Food updated"))
    .catch((error) => res.status(400).json(error));
});

// DELETE
exerciseRouter.route("/:id").patch(authenticateUser, (req, res) => {
  Exercise.deleteOne({ _id: req.params.id, userId: getUserId(req) })
    .then(() => res.status(200).send("Food deleted"))
    .catch((error) => res.status(400).json(error));
});

module.exports = exerciseRouter;
