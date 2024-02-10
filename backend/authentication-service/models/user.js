// In a file like models/User.js

const { DataTypes } = require("sequelize");

const sequelize = require("../database/db");

// Define the User model
const User = sequelize.define("User", {
  userId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passWord: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobileNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profileUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Create the User table in the database
User.sync()
  .then(() => console.log("User table created successfully"))
  .catch((err) => console.error("Error creating user table:", err));

module.exports = User;
