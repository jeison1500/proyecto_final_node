const AppError = require('../utils/appError');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const User = require('../models/usersModel');

exports.signup = catchAsync(async (req, res) => {
  const { name, email, password, role } = req.body;

  const salt = await bcrypt.genSalt(8);
  const encryptedPassword = bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = await generateJWT(user.id);

  res.status(201).json({
    status: 'success',
    token,
    user,
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    return next(new AppError('Email or password incorrect...😥', 400));
  }

  if (!(await bycrypt.compare(password, user.password))) {
    return next(new AppError('Email or password incorrect...😥', 400));
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'success',
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

exports.update = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { name, email } = req.body;

  await user.update({
    name,
    email,
  });
  return res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
  });
});
exports.delete = catchAsync(async (req, res, next) => {
  const { user } = req;

  await user.update({
    status: 'inactive',
  });
  return res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});
