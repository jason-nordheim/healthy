const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    first: { type: String, required: true }, // first name
    last: { type: String, required: true }, // last name
    height: { type: Number, required: false }, // height in centimeters
    uom: { type: String, required: true, default: "imperial" },
    birthday: {
      type: String,
      required: true,
      validate: (val) => {
        return /(\d{4})-(\d{1,2})-(\d{1,2})/.test(val);
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: (val) => {
        return /^[^@]+@\w+(\.\w+)+\w$/.test(val);
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      minLength: 5,
    },
    passwordDigest: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = userSchema;
