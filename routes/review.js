const express = require("express");
const router = express.Router({mergeParams: true});
const { listingSchema, reviewSchema } = require("../schema.js");
const wrapAsync = require("../Util/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const {validateReview, isloggedIn , isReviewAuthor, saveRedirectUrl} =require("../middleware.js")
const reviewController = require("../controllers/reviews.js");

router.post("/",
isloggedIn,
 validateReview,
  wrapAsync(reviewController.createReview));

//reviews delete route
router.delete("/:reviewId",
isloggedIn,
isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;