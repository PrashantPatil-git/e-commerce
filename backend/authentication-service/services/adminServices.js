// adminService.js

require("dotenv");

const { createToken } = require("../authentication/getToken");

const Admin = require("../models/admin"); // Assuming you have a model named Admin

async function login(userName, passWord) {
  try {
    // Find admin by email
    const admin = await Admin.findOne({ where: { userName } });

    if (!admin) {
      throw new Error("Invalid credentials");
    }

    const isPasswordValid = passWord === admin.passWord;

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    const token = await createToken(admin.adminId);

    return { token };
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

module.exports = { login };
