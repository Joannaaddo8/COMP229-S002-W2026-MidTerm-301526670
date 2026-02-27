let UsersModel = require('../models/users');

module.exports.usersList = async function (req, res, next) {
  try {

    let users = await UserModel.find();

    let formattedUsers = users.map(user => ({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      created: user.created,
      updated: user.updated,
      id: user.id   // convert _id to id
    }));

    res.json({
      success: true,
      message: "Users list retrieved successfully.",
      data: formattedUsers
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.getByID = async function (req, res, next) {
  try {
    let user = await UsersModel.findOne({ _id: req.params.id });

    if (!user) {
      // ✅ return 404 instead of throwing error (prevents 500)
      return res.status(404).json({
        success: false,
        message: "User not found. Are you sure it exists?"
      });
    }

    res.json({
      success: true,
      message: "User retrieved successfully.",
      data: user
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};

let UserModel = require('../models/users');

module.exports.processAdd = async function (req, res, next) {
  try {

    let user = await UserModel.create(req.body);

    res.status(200).json({
      success: true,
      message: "User added successfully.",
      data: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        created: user.created,
        updated: user.updated,
        id: user.id   //convert _id to id
      }
    });

  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports.processEdit = async (req, res, next) => {
    try {

        let id = req.params.id;

        // Builds updatedUser from the values of the body of the request.
        let updatedUser = UsersModel(req.body);
        updatedUser._id = id;

        // Submits updatedUser to the DB and waits for a result.
        let result = await UsersModel.updateOne({ _id: id }, updatedUser);
        console.log("====> Result: ", result);

        // If the user is updated redirects to the list
        if (result.modifiedCount > 0) {
            res.json(
                {
                    success: true,
                    message: "User updated successfully."
                }
            );
        }
        else {
            // Express will catch this on its own.
            throw new Error('User not udated. Are you sure it exists?')
        }

    } catch (error) {
        next(error)
    }
}


module.exports.performDelete = async (req, res, next) => {

    try {

        let id = req.params.id;

        let result = await UsersModel.deleteOne({ _id: id });

        console.log("====> Result: ", result);
        if (result.deletedCount > 0) {
            // refresh the book list
            res.json(
                {
                    success: true,
                    message: "User deleted successfully."
                }
            )
        }
        else {
            // Express will catch this on its own.
            throw new Error('User not deleted. Are you sure it exists?')
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}
