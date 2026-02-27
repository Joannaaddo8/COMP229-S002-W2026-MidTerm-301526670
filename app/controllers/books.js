let BookModel = require('../models/books');

module.exports.getBook = async function (req, res, next) {
  try {
    // Accept either param name (router might be :id OR :bookId)
    const id = req.params.bookId || req.params.id;
    console.log("GET /books id received:", id);
    let book = await BookModel.findById(id);

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found."
      });
    }

    res.json({
      success: true,
      message: "Book retrieved successfully.",
      data: book
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.create = async function (req, res, next) {
  try {
    // Get input from the request
    let book = req.body;

    // Insert into the DB
    let result = await BookModel.create(book);
    console.log("Result: ", result);

    // Send a response
    res.status(200);
    res.json(
      {
        success: true,
        message: "Book created successfully.",
        data: result
      }
    );

  } catch (error) {
    console.log(error);
    next(error);
  }

}

module.exports.getAll = async function (req, res, next) {
  try {
    // Get all from the DB.
    let list = await BookModel.find();

    // Send a response
    res.json({
        success: true,
        message: "Book list retrieved successfully.",
        data: list
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports.update = async function (req, res, next) {
  try {
    const bookId = req.params.bookId;

    const result = await BookModel.updateOne(
      { _id: bookId },
      { $set: req.body }
    );

    if (result.modifiedCount > 0) {
      return res.status(200).json({
        success: true,
        message: "Book updated successfully."
      });
    }

    // if matchedCount is 0 → no doc with that id
    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Book not found."
      });
    }

    // matched but no changes (same data)
    return res.status(200).json({
      success: true,
      message: "Book updated successfully."
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.remove = async function (req, res, next) {
  try {
    const bookId = req.params.bookId;

    const result = await BookModel.deleteOne({ _id: bookId });

    if (result.deletedCount > 0) {
      return res.status(200).json({
        success: true,
        message: "Book deleted successfully."
      });
    }

    return res.status(404).json({
      success: false,
      message: "Book not found."
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};