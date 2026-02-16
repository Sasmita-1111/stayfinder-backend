const { userSchema, listingSchema, reviewSchema } = require("../schema");
const AppError = require("../utils/AppError");


/* =========================
   LISTING VALIDATION
========================= */
module.exports.validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        return next(new AppError(msg, 400));
    }
    next();
};
/* =========================
   REVIEW VALIDATION
========================= */
module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(",");
        return next(new AppError(msg, 400));
    }
    next();
};

/* =========================
   USER VALIDATION
========================= */
module.exports.validateUser = (req, res, next) => {
   let { error } = userSchema.validate(req.body);
    if (error) {
        let msg = error.details.map(el => el.message).join(",");
        return next(new AppError(msg, 400));
    }
    next();
};
