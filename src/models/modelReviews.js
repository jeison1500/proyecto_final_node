const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Reviews = db.define("reviews", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  restaurantId:{
   type: DataTypes.STRING,
   allowNull: false,
 },  
 rating: {
  type: DataTypes.STRING,
  allowNull: false,
  },
});

module.exports = Reviews;