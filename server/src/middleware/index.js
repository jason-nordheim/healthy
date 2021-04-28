function validateRegisterParams(req, res, next) {
  const missingFieldError = (field) =>
    res.status(400).send(`${field} required`);

  if (!req.body.password) return missingFieldError("password");
  if (!req.body.email) return missingFieldError("email");
  if (!req.body.email) return missingFieldError("username");
  if (!req.body.first) return missingFieldError("first");
  if (!req.body.last) return missingFieldError("last");
  if (!req.body.birthday) return missingFieldError("birthday");

  next();
}

module.exports = {
  validateRegisterParams,
};
