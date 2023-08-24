const catchAsync = require("./../utils/catchAsync");
const Restaurant = require("./../models/restaurantsModel");
const User = require("./../models/usersModel");
const Review = require('../models/modelReviews')


exports.findRestaurants = catchAsync(async (req, res, next) => {
  const restaurant = await Restaurant.findAll({
    where: {
      status: ["available"],
    },
    include: [
      {
        model: User,
        attributes: ["name", "email", "role"],
      },
    ],
  });

  return res.status(200).json({
    status: "success",
    results: restaurant.length,
    restaurant,
  });
});

exports.createRestaurant = catchAsync(async (req, res) => {
  const { name, address, rating, } = req.body;

  const restaurant = await Restaurant.create({
    name,
    address,
    rating,
    });

  return res.status(201).json({
    status: "success",
    message: "Restaurant created",
    restaurant,
  });
});

exports.findRestaurant = catchAsync(async (req, res) => {
  const { restaurant } = req;

  
  return res.status(200).json({
    status: "success",
    message: "Restaurant found",
    restaurant,
  });
});

exports.updateRestaurant = catchAsync(async (req, res) => {
  const { restaurant } = req;
  const {name, address} = req;
  await Restaurant.update({ name , address });

  return res.status(200).json({
    status: "success",
    message: "Restaurant updated",
    restaurant,
  });
});

exports.deleteRestaurant = catchAsync(async (req, res) => {
  const { restaurant } = req;
  await Restaurant.update({ status: "closed" });

  return res.status(200).json({
    status: "success",
    message: "restaurant closed",
    restaurant,
  });
});



exports.createReviews = catchAsync(async (req, res) => {
  const { comment , rating } = req.body;
  const {id} = req.params;
  const uid = req.sessionUser.id

  await Review.create({
    comment,
    rating,
    restaurantId: +id,
    userId: +uid
    
    });

  return res.status(201).json({
    status: "success",
    message: "Reviews created",
    reviews,
  });
});

exports.updateReviews = catchAsync(async (req, res) => {
  const { reviews } = req;
  const {comment, rating} = req.body;
 
  await reviews.update({comment, rating });

  return res.status(200).json({
    status: "success",
    message: "Reviews updated",
    reviews,
  });
});

exports.deleteReviews = catchAsync(async (req, res) => {
  const { reviews } = req;

  await reviews.update({status: 'inactive'})

  return res.status(200).json({
    status: "success",
    message: "Reviews delete",
    reviews,
  });
  
});

