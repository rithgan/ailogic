const { sequelize } = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    phone: {
      type: DataTypes.STRING,
    },
    profile_picture: {
      type: DataTypes.STRING,
      field: "profile_picture",
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

module.exports = User;
