const { Router, request } = require("express");
const bcrypt = require("bcrypt");
const { User } = require("../models");
const { validateRegisterParams } = require("../middleware");
const { saltRounds, jwtKey, jwtOptions } = require("../config/app.config");
const { authenticateUser, getUserId } = require("../middleware/authenticate");
const jwt = require("jsonwebtoken");

const userRouter = Router();

// CREATE new user
userRouter.route("/").post(validateRegisterParams, (req, res) => {
  bcrypt
    .hash(req.body.password, saltRounds)
    .then((hashedPassword) =>
      User.create({
        ...req.body,
        password: null,
        passwordDigest: hashedPassword,
      })
    )
    .then(() => res.status(201).json("User registered"))
    .catch((error) => res.status(400).json(error));
});

// LOGIN (token)
userRouter.route("/login").post((req, res) => {
  User.findOne({ username: req.body.username })
    .then((foundUser) => {
      bcrypt.compare(
        req.body.password,
        foundUser.passwordDigest,
        (error, isMatch) => {
          if (error) {
            res.status(400).json({ error });
          } else if (!isMatch) {
            res.status(401).send("Invalid Credentials");
          } else {
            const token = jwt.sign({ id: foundUser.id }, jwtKey, jwtOptions);
            res.status(201).json({ token });
          }
        }
      );
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

// READ (current user)
userRouter.route("/").get(authenticateUser, (req, res) => {
  User.findOne({ _id: getUserId(req) })
    .then((user) => res.json({ ...user._doc, passwordDigest: undefined }))
    .catch((error) => res.status(400).json(error));
});

// UPDATE (current user)
userRouter.route("/").patch(authenticateUser, (req, res) => {
  User.updateOne({ _id: getUserId(req) }, { ...req.body })
    .then(() => res.status(200).send("User updated"))
    .catch((error) => res.status(400).json(error));
});

// DELETE
userRouter.route("/").delete(authenticateUser, (req, res) => {
  User.deleteOne({ _id: getUserId(req) })
    .then(() => res.status(200).json("User deleted"))
    .catch((error) => res.status(400).json(error));
});

module.exports = userRouter;
