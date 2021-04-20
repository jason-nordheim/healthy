const { Schema, Types } = require("mongoose");

const weightSchema = new Schema(
  {
    userId: { type: Types.ObjectId, required: true }, // used to associate records
    source: { type: String, required: false, default: undefined },
    kg: { type: Number, required: true }, // weight in kilograms
  },
  { timestamps: true }
);

module.exports = weightSchema;
