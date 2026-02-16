const Listing = require("../models/listingModel");
const { cloudinary } = require("../config/cloudConfig");


module.exports.index =async(req,res)=>{
   const allListings =await Listing.find({});
   res.render("listings/index",{allListings});
};


module.exports.renderNewForm=(req, res) => {
    res.render("listings/new.ejs");
};


module.exports.showListing =async (req,res) => {
    let {id} =req.params;
    const listing = await Listing.findById(id)
    .populate({
        path: "reviews",
        populate:{
            path:"author",
        },
    })
    .populate("owner");
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
       return res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs",{listing});
};


module.exports.createListing = async (req, res) => {
  const newListing = new Listing(req.body.listing);

  if (req.file) {
    newListing.image = {
      url: req.file.path,      // later: cloudinary url
      filename: req.file.filename
    };
  }

  newListing.owner = req.user._id;
  await newListing.save();

  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};



module.exports.editForm=async(req,res)=>{
    let {id}=req.params;
    const listing =await Listing.findById(id);
    if(!listing){
        req.flash("error","Listing you requested for does not exist!");
       return res.redirect("/listings");
    }

    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/w_250"
    );

    res.render("listings/edit.ejs",{listing, originalImageUrl});
   };


module.exports.updateListing=async(req,res) =>{
    let {id } = req.params;    
    let listing = await Listing.findByIdAndUpdate(id,{ ...req.body.listing});

    if(typeof req.file !=="undefined"){
    let url =req.file.path;
    let filename = req.file.filename;
    listing.image ={url , filename};
    await listing.save();
    }
    req.flash("success","Listing updated");
    res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async(req,res)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);

    // 🔴 delete image from cloudinary
    if(listing.image && listing.image.filename){
        await cloudinary.uploader.destroy(listing.image.filename);
    }

    await Listing.findByIdAndDelete(id);

    req.flash("success","Listing Deleted");
    res.redirect("/listings");
};

