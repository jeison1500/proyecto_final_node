const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Restaurants = db.define("restaurants", {
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
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating:{
   type: DataTypes.STRING,
   allowNull: false,
 },  
  status: {
    type: DataTypes.ENUM("open", "closed"),
    allowNull: false,
    defaultValue: "open",
  },
});

module.exports = Restaurants;