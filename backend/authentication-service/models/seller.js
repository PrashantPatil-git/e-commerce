const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

// Define the Seller model
const Seller = sequelize.define("Seller", {
  sellerId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  panNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobileNumber: {
    type: DataTypes.STRING,
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
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Assuming default value is false
  },
});

// Create the Seller table in the database
Seller.sync({ alter: true })
  .then(() => console.log("Seller table created successfully"))
  .catch((err) => console.error("Error creating Seller table:", err));

module.exports = Seller;
