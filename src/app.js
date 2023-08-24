const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHander = require('./controllers/errorsControllers');

// routes
const usersRouter = require('./routes/userRoutes');
const restaurantsRouter = require('./routes/restaurantRoutes');
const mealsRouter = require('./routes/mealsRoutes');
const ordersRouter = require('./routes/orderRoutes');

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantsRouter);
app.use('/api/v1/meals', mealsRouter);
app.use('/api/v1/orders', ordersRouter);

app.use(globalErrorHander);

module.exports = app;
