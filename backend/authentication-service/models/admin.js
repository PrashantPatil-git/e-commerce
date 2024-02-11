// admin.model.js

const { DataTypes } = require("sequelize");
const sequelize = require("../database/db"); // import configured sequelize

const Admin = sequelize.define("Admin", {
  adminId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  passWord: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  },
});

// Create the Admin table in the database
Admin.sync({ alter: true })
  .then(() => console.log("Admin table created successfully"))
  .catch((err) => console.error("Error creating Admin table:", err));

module.exports = Admin;
