const express = require('express');

const mealsController = require('../controllers/mealsController');

const authMiddleware = require('../middlewares/authMiddleware');
const mealsMiddleware = require('../middlewares/mealsMiddleware');
const router = express.Router();

router.route('/').get(mealsController.findMeals);
router.get('/:id', mealsController.findOneMeal);

router
  .use('/:id', mealsMiddleware.existMeals)
  .route('/:id')
  .post(
    authMiddleware.protect,
    authMiddleware.restrictTo('admin'),
    mealsController.createMeal
  )
  .patch(authMiddleware.restrictTo('admin'), mealsController.updateMeal)
  .delete(authMiddleware.restrictTo('admin'), mealsController.deleteMeal);

module.exports = router;
