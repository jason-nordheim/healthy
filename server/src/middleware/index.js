function validateRegisterParams(req, res, next) {
  const missingFieldError = (field) =>
    res.status(400).json({
      error: {
        message: `${field} required`,
      },
      field,
      helpText: "Missing value",
    });

  const invalidValueError = (field, helpText) =>
    res.status(400).json({
      error: {
        message: `Error: "${field}" value  ${helpText} `,
        field,
        helpText,
      },
    });

  if (!req.body.password) return missingFieldError("password");
  else if (req.body.password.length < 5)
    return invalidValueError("password", "is too short");
  else if (!req.body.email) return missingFieldError("email");
  else if (!req.body.username) return missingFieldError("username");
  else if (!req.body.first) return missingFieldError("first");
  else if (!req.body.last) return missingFieldError("last");
  else if (!req.body.birthday) return missingFieldError("birthday");
  else next();
}

module.exports = {
  validateRegisterParams,
};
