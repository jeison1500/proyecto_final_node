const express = require('express');

// controllers
const userController = require('../controllers/userControllers');

// middelwares
const authMiddleware = require('../middlewares/authMiddleware');
const userMiddleware = require('../middlewares/userMiddleware');
const validationMiddleware = require('..//middlewares/validationMiddleware');
const orderMiddleware = require('../middlewares/orderMiddleware');

// routes
const router = express.Router();

router.post('/login', validationMiddleware.validlogin, userController.login);
router.post('/signup', validationMiddleware.validUser, userController.signup);

router.use(authMiddleware.protect);

router
  .use('/id', userMiddleware.existUser)
  .route('/id')
  .patch(authMiddleware.protectAccountOwner, userController.update)
  .delete(authMiddleware.protectAccountOwner, userController.delete);

router.get(
  '/orders',
  authMiddleware.protectAccountOwner,
  orderMiddleware.AllOrders
);
router.get(
  '/orders/:id',
  authMiddleware.protectAccountOwner,
  orderMiddleware.includeOrder
);

module.exports = router;
