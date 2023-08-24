const User = require('./usersModel');
const Restaurant = require('./restaurantsModel');
const Order = require('./ordersModel');
const Meal = require('./mealsModel');
const Review = require('./mealsModel');

const initModel = () => {
  Restaurant.hasMany(Meal);
  Meal.belongsTo(Restaurant);

  Restaurant.hasMany(Review);
  Review.belongsTo(Restaurant);

  User.hasMany(Review);
  Review.belongsTo(User);

  User.hasMany(Order);
  Order.belongsTo(User);

  Meal.hasMany(Order);
  Order.belongsTo(Meal);
};

module.exports = initModel;
