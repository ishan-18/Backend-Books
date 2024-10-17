const ComicBook = require("../models/ComicBook");

exports.getAll = async (req, res, next) => {
  try {
    const books = await ComicBook.find({});
    res.status(200).json({
      success: true,
      data: books,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getById = async (req, res, next) => {
  try {
    const book = await ComicBook.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.create = async (req, res, next) => {
  try {
    const {
      name,
      author,
      yearOfPublication,
      price,
      discount,
      numberOfPages,
      condition,
      description,
    } = req.body;

    if (
      !name ||
      !author ||
      !yearOfPublication ||
      !price ||
      !numberOfPages ||
      !condition
    ) {
      return res.status(400).json({
        success: false,
        error: "Please Enter all the required fields",
      });
    }

    const book = await ComicBook.create(req.body);
    res.status(201).json({
      success: true,
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.update = async function (req, res, next) {
  try {
    const book = await ComicBook.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      data: book,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.remove = async function (req, res, next) {
  try {
    const book = await ComicBook.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({
        success: false,
        error: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
