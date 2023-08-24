const catchAsync = require('../utils/catchAsync');
const Order = require('../models/ordersModel');
const AppError = require('../utils/appError');
const Restaurants = require('../models/restaurantsModel');
const Meals = require('../models/mealsModel');

exports.existOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: {
      id,
      status: active,
    },
  });

  if (!order) return next(new AppError(`Meals with id: $(id) not fourt`, 404));

  req.order = order;
  next();
});

exports.validateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  if (order.status !== 'active') {
    return next(new AppError('Order is not active', 400));
  }
  req.order = order;
  next();
});

exports.includeOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [
      {
        model: Meals,
      },
      {
        model: Restaurants,
      },
    ],
  });

  if (!order) return next(new AppError(`Order with id: $(id) not fourt`, 404));

  req.order = order;
  next();
});

exports.AllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    where: {
      userId: req.user.id,
    },
    include: [
      {
        model: Meals,
      },
      {
        model: Restaurants,
      },
    ],
  });

  if (!orders) return next(new AppError(`Order with id: $(id) not fourt`, 404));

  req.order = order;
  next();
});
