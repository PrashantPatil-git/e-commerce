// Import the User model defined in models/User.js
const User = require("../models/user");
const { createToken } = require("../authentication/getToken");
const { hashPassword } = require("../authentication/encrypt");

// import module to encrypt the user passwords
const bcrypt = require("bcrypt"); // For password hashing

// Controller or Service function to create a new user
async function createUser(req) {
  // validate the credentials

  const { email, firstName, lastName, passWord, mobileNumber, profileUrl } =
    req.body;

  try {
    // verify whether user already exists or not
    const existingUser = await User.findOne({ where: { email: email } });

    if (existingUser) {
      return { success: false, message: "User with this email already exists" };
    }

    const hashedPassword = await hashPassword(passWord);

    // Create a new user object

    const newUser = await User.create({
      email,
      firstName,
      lastName,
      passWord: hashedPassword,
      mobileNumber,
      profileUrl,
    });

    return {
      success: true,
      message: "User registered successfully",
      user: newUser,
    };
  } catch (error) {
    // Handle any errors that occur during user creation

    console.log(error);
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

    const isPasswordValid = await bcrypt.compare(passWord, user.passWord);

    // Check if user exists and if password matches
    if (!user || !isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = await createToken(user.userId);
    // return user and token
    return { user, token };
  } catch (error) {
    console.log("error while login user : " + error);
    throw new Error(error.message);
  }
}

module.exports = {
  createUser,
  loginUser,
};
