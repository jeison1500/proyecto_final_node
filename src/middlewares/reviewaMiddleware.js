const catchAsync = require('../utils/catchAsync');
const Reviews = require('../models/modelReviews');

exports.existReviews = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const reviews = await Reviews.findOne({
    where: {
      status: Active,
      id,
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!reviews)
    return next(new AppError(`Review with id: $(id) not fourt`, 404));

  req.reviews = reviews;
  req.user = review.user;
  next();
});
