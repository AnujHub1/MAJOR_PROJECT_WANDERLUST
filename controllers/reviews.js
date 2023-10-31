const Listing = require("../models/listing");
const Review = require("../models/review");

module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    let newRew = new Review(req.body.review);
    newRew.author = req.user._id;
    //console.log(newRew);
    listing.reviews.push(newRew);
    
    await newRew.save();
    await listing.save();
    req.flash("success" , "New review is created!")
    res.redirect(`/listings/${listing._id}`);
};

module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } })
    await Review.findByIdAndDelete(reviewId);
    req.flash("success" , "Review is Deleted!")
    res.redirect(`/listings/${id}`);
};