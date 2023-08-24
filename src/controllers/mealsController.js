const catchAsync = require('./../utils/catchAsync');
const Restaurant = require('./../models/restaurantsModel');
const Meals = require('./../models/mealsModel');

exports.findMeals = catchAsync(async (req, res, next) => {
  const meals = await Meals.findAll({
    where: {
      status: ['available'],
    },
    include: [
      {
        model: Restaurant,
        attributes: ['name', 'address', 'rating'],
      },
    ],
  });

  return res.status(200).json({
    status: 'success',
    results: meals.length,
    meals,
  });
});

exports.createMeal = catchAsync(async (req, res) => {
  const { name, price } = req.body;
  const { id } = req.params;

  await Review.create({
    name,
    price,
    restaurantId: +id,
  });

  return res.status(201).json({
    status: 'success',
    message: 'Meals created',
    meals,
  });
});

exports.findOneMeal = catchAsync(async (req, res, next) => {
  const { meals } = req;

  return res.status(200).json({
    status: 'success',
    meals,
  });
});

exports.updateMeal = catchAsync(async (req, res) => {
  const { meals } = req;
  const { name, price } = req;
  await Meals.update({ name, price });

  return res.status(200).json({
    status: 'success',
    message: 'Meals updated',
    meals,
  });
});

exports.deleteMeal = catchAsync(async (req, res) => {
  const { meals } = req;
  await Meals.update({ status: 'desactive' });

  return res.status(200).json({
    status: 'success',
    message: 'Meals desactive',
    meals,
  });
});
