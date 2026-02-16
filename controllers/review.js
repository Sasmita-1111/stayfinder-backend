const Listing =require("../models/listingModel");
const Review =require("../models/reviewModel");


const userController =require("../controllers/user.js");


module.exports.createReview = async (req,res)=>{
    let listing = await Listing.findById(req.params.id);

    // prevent duplicate review
    const alreadyReviewed = await Review.findOne({
        author: req.user._id,
        _id: { $in: listing.reviews }
    });

    if(alreadyReviewed){
        req.flash("error","You already reviewed this listing");
        return res.redirect(`/listings/${req.params.id}`);
    }

    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    req.flash("success","Review added");
    res.redirect(`/listings/${req.params.id}`);
};


module.exports.destroyReview =async (req, res) => {
        let { id, reviewId } = req.params;

        await Listing.findByIdAndUpdate(id, {
        $pull: { reviews: reviewId }
    });

        await Review.findByIdAndDelete(reviewId);
        req.flash("success","Review Deleted");
        res.redirect(`/listings/${id}`);
};