const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const ComicBookSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4(),
    },
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100,
    },
    author: {
      type: String,
      required: true,
      minLength: 2,
    },
    yearOfPublication: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
    numberOfPages: {
      type: Number,
      required: true,
    },
    condition: {
      type: String,
      enum: ["new", "used"],
      default: "new",
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("ComicBook", ComicBookSchema);
