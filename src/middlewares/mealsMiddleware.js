const catchAsync = require('../utils/catchAsync');
const Meals = require('../models/mealsModel');
const AppError = require('../utils/appError');

exports.existMeals = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const meals = await Meals.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  if (!meals) {
    return next(new AppError('Meals not found', 404));
  }

  req.meals = meals;
  next();
});
