const express = require('express');


const restaurantController = require('../controllers/restaurantControllers');




const authMiddleware = require('../middlewares/authMiddleware')
const restaurantMiddleware = require ('../middlewares/restaurantMiddleware')
const reviewMiddleware = require('../middlewares/reviewaMiddleware')
const router = express.Router();

router
.route('/')
.get(restaurantController.findRestaurants)
.post(
 authMiddleware.protect,
 authMiddleware.restrictTo('admin'),
 restaurantController.createRestaurant);

router
.use('/:id', restaurantMiddleware.existRestaurant)
.route('/:id')
.patch(
  authMiddleware.protect, 
  authMiddleware.restrictTo('admin'), 
  restaurantController.updateRestaurant)
.delete(
  authMiddleware.protect, 
  authMiddleware.restrictTo('admin'),
  restaurantController.deleteRestaurant)
.get(restaurantController.findRestaurant);

router.use(authMiddleware.protect,)

router.post(
  '/reviews/:id', 
  restaurantMiddleware.existRestaurant, 
  restaurantController.createReviews
  );


router
.use(
  '/reviews/:restaurantId/:id',
   reviewMiddleware.existReviews, 
   restaurantMiddleware.existRestaurant
    )

.route('/reviews/:restaurantId/:id')
.patch(restaurantController.updateReviews)
.delete(restaurantController.deleteReviews)



module.exports = router;
