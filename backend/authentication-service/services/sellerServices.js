const bcrypt = require("bcrypt");
const Seller = require("../models/seller"); // Sequelize model Seller for orm
const { createToken } = require("../authentication/getToken");
const { hashPassword } = require("../utils/encrypt");

// import email related services
const { validateEmail } = require("./mailServices");

const register = async (req) => {
  try {
    // access the seller registration data
    let { firstName, lastName, panNumber, mobileNumber, email, passWord } =
      req.body;

    // Check if the seller with the email already exists
    const existingSeller = await Seller.findOne({ where: { email } });

    if (existingSeller) {
      throw new Error("Seller with this email already exists");
    }

    // verify credentials, email , mobileNumber

    // validate the credentials

    // validate email
    const emailValidationResult = await validateEmail(email);
    console.log(emailValidationResult);

    // if email is not valid, return message as email is not valid
    if (!emailValidationResult) {
      return {
        success: false,
        message: "Invalid email address",
      };
    }

    // Hash the password
    const hashedPassword = await hashPassword(passWord);

    // Create the seller
    const seller = await Seller.create({
      firstName,
      lastName,
      panNumber,
      mobileNumber,
      email,
      passWord: hashedPassword,
    });

    return {
      success: true,
      message: "Request is under processing(for seller registration)",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (email, passWord) => {
  try {
    // first validate whether email is valid email or not
    // validate email
    //  or we can skip directly checking this into our db
    //   const emailValidationResult = await validateEmail(email);

    // Find the seller by email
    const seller = await Seller.findOne({ where: { email } });
    if (!seller) {
      throw new Error("Seller not found");
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(passWord, seller.passWord);

    if (!passwordMatch) {
      throw new Error("Incorrect password for seller login");
    }

    // Generate JWT token
    const token = await createToken(seller.sellerId);

    return { token, seller };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { register, login };
