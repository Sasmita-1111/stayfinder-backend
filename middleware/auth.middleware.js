const Listing = require("../models/listingModel");
const Review = require("../models/reviewModel");
const AppError = require("../utils/AppError");

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req, res, next) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        return next(new AppError("Listing not found", 404));
    }

    if (!listing.owner.equals(res.locals.currUser._id)) {
        return next(new AppError("You are not authorized", 403));
    }
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { reviewId } = req.params;
    const review = await Review.findById(reviewId);

    if (!review) {
        return next(new AppError("Review not found", 404));
    }

   if (!res.locals.currUser || !review.author.equals(res.locals.currUser._id)) {
        return next(new AppError("You are not authorized", 403));
    }

    next();
};
