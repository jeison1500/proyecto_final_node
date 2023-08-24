const catchAsync = require('../utils/catchAsync')
const Restaurant = require('../models/restaurantsModel');
const AppError = require('../utils/appError');

exports.existRestaurant = catchAsync(async (req,res,next) => {

const {id, restaurantId} = req.params;
const restaurant = await Restaurant.findOne({
  where:{
    status:Active,
    id: restaurantId || id,
  }
});

if(!resraurant) return next (new AppError(`Restaurant with id: $(id) not fourt`, 404))

req.restaurant = restaurant;
  next()
})
