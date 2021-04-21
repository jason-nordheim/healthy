var jwt = require("jsonwebtoken");
const { jwtKey, jwtOptions } = require("../config/app.config");
const isAfter = require("date-fns/isAfter");

const authenticateUser = (req, res, next) => {
  if (!req.headers.authorization) return res.status(400).send();

  const token = req.headers.authorization.split(" ")[1];
  const decoded_token = jwt.verify(token, jwtKey, jwtOptions);
  const token_expires = new Date(decoded_token.exp * 1000);
  const isExpired = isAfter(Date.now, token_expires);
  const expirationMessage = `token expired at ${token_expires}`;

  if (isExpired) return res.status(403).send(expirationMessage);

  req.headers.userId = decoded_token.id;
  next();
};

const getUserId = (request) => request.headers.userId;
module.exports = { authenticateUser, getUserId };
