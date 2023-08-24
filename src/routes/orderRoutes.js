const express = require('express');

const orderController = require('../controllers/orderController');
const orderMiddleware = require('../middlewares/orderMiddleware');
const mealsMiddleware = require('../middlewares/mealsMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.use(orderMiddleware.existOrder);

router.route('/').post(mealsMiddleware.existMeals, orderController.createOrder);
router
  .route('/me')
  .get(orderMiddleware.includeOrder, orderController.findAllOrder);

router;

router
  .use(
    '/:id',
    orderMiddleware.validateOrder,
    authMiddleware.protectAccountOwner
  )
  .route('/:id')
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

module.exports = router;
