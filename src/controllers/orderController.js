const catchAsync = require('./../utils/catchAsync');
const Order = require('../models/ordersModel');

exports.createOrder = catchAsync(async (req, res) => {
  const { quantity, mealId } = req.body;

  const uid = req.sessionUser.id;

  const meal = await Meal.findByPk(mealId);

  const price = meal.price * quantity;

  const order = await Order.create({
    quantity,
    price,
    mealId,
    userId: +uid,
  });

  return res.status(201).json({
    status: 'success',
    message: 'Order created successfully',
    order,
  });
});

exports.findAllOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findAll({
    where: {
      status: active,
    },
  });

  return res.status(200).json({
    status: 'success',
    results: Order.length,
    order,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'completed' });

  return res.status(200).json({
    status: 'success',
    message: 'Order updated successfully',
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;

  await order.update({ status: 'cancelled' });

  return res.status(200).json({
    status: 'success',
    message: 'Order delete successfully',
  });
});
