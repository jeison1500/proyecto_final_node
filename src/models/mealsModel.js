const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const Meals = db.define('meals', {
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
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'desactive'),
    allowNull: false,
    defaultValue: 'active',
  },
});

module.exports = Meals;
