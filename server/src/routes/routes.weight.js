const { Router } = require("express");
const { authenticateUser, getUserId } = require("../middleware/authenticate");
const { Weight } = require("../models");

const weightRouter = Router();

// GET all
weightRouter.route("/").get(authenticateUser, (req, res) => {
  const userId = getUserId(req);
  Weight.find({ userId })
    .then((result) => res.json(result))
    .catch((error) => res.status(400).json(error));
});

// GET by id
weightRouter.route("/:id").get(authenticateUser, (req, res) => {
  const userId = getUserId(req);
  Weight.findOne({ _id: req.params.id, userId })
    .then((result) => res.json(result))
    .catch((error) => res.status(400).json(error));
});

// POST (create one)
weightRouter.route("/").post(authenticateUser, (req, res) => {
  const userId = getUserId(req);
  const { source, kg } = req.body;

  const newWeight = new Weight({
    userId,
    source,
    kg,
  });

  newWeight
    .save()
    .then(() => res.status(201).json("Weight saved"))
    .catch((error) => res.status(400).json(error));
});

// PATCH (update one)
weightRouter.route("/:id").patch(authenticateUser, (req, res) => {
  const userId = getUserId(req);
  const weightId = req.params.id;

  const { source, kg } = req.body;

  Weight.updateOne(
    { _id: weightId, userId: userId },
    {
      source,
      kg,
    }
  )
    .then(() => res.status(200).json("Weight updated"))
    .catch((error) => res.status(400).json(error));
});

// DELETE (remove one)
weightRouter.route("/:id").delete(authenticateUser, (req, res) => {
  const userId = getUserId(req);
  const weightId = req.params.id;

  Weight.deleteOne({ _id: weightId, userId })
    .then(() => res.status(200).json("Weight deleted"))
    .catch((error) => res.status(400).json(error));
});

module.exports = weightRouter;
