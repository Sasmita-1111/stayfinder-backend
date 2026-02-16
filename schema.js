const Joi = require("joi");

/* =========================
   USER VALIDATION
========================= */
module.exports.userSchema = Joi.object({
        username: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required()
});

/* =========================
   LISTING VALIDATION
========================= */
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        price: Joi.number().min(0).required(),
        location: Joi.string().required(),
        country: Joi.string().required(),
        description: Joi.string().required()
    }).required()
});

/* =========================
   REVIEW VALIDATION
========================= */
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().min(1).max(5).required(),
        comment: Joi.string().required()
    }).required()
});



























// const joi = require('joi');

// module.exports.listingSchema = joi.object({
//     listing:joi.object({
//         title:joi.string().required(),
//         description:joi.string().required(),
//        location:joi.string().required(),
//        country:joi.string().required(),
//         price:joi.number().required().min(0),
//         img:joi.string().allow("",null)
//     }).required(),
// })



// module.exports.reviewSchema =  joi.object({
//     review: joi.object({
//         rating:joi.number().required().min(1).max(5),
//         comment:joi.string().required(),
//     }).required(),
// });