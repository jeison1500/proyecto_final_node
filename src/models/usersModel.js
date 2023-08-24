const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const User = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
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
 password:{
   type: DataTypes.STRING,
   allowNull: false,
  },  
  status: {
    type: DataTypes.ENUM("active", "inactive"),
    allowNull: false,
    defaultValue: "active",
  },  
 role:{
  type: DataTypes.ENUM("user","admin"),
  allowNull: false,
  defaultValue: "user",
 },
  
});

module.exports = User;