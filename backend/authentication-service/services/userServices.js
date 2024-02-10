// Import the User model defined in models/User.js
const User = require("../models/user");
const { createToken } = require("../authentication/getToken");

// Controller or Service function to create a new user
async function createUser(req) {
  // validate the credentials

  const { email, firstName, lastName, passWord, mobileNumber } = req.body;

  try {
    // verify whether user already exists or not
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      return { success: false, message: "User with this email already exists" };
    }

    // Create a new user object
    const newUser = await User.create({
      email,
      firstName,
      lastName,
      passWord,
      mobileNumber,
    });

    return {
      success: true,
      message: "User registered successfully",
      user: newUser,
    };
  } catch (error) {
    // Handle any errors that occur during user creation

    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error(error.errors[0].message);
    }
  }
}

// service function to allow user to login into the system

async function loginUser(email, passWord) {
  // find user with email and passWord
  // if not return error
  // else return JWT, and user

  try {
    // find user by user email
    const user = await User.findOne({
      where: { email: email },
    });

    // Check if user exists and if password matches
    if (!user || user.passWord !== passWord) {
      throw new Error("Invalid email or password");
    }

    const token = await createToken(user);
    // return user and token
    return { user, token };
  } catch (error) {
    console.log("user while login user : " + error);
    throw new Error(error.message);
  }
}

module.exports = {
  createUser,
  loginUser,
};
