function validateRegisterParams(req, res, next) {
  const missingFieldError = (field) =>
    res.status(400).send(`${field} required`);

  if (!req.body.password) return missingFieldError("password");
  if (!req.body.email) return missingFieldError("email");
  if (!req.body.first) return missingFieldError("first");
  if (!req.body.last) return missingFieldError("last");
  if (!req.body.day) return missingFieldError("day");
  if (!req.body.month) return missingFieldError("month");
  if (!req.body.year) return missingFieldError("year");

  next();
}

module.exports = {
  validateRegisterParams,
};
