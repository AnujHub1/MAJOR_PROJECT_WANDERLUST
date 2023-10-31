const express = require("express");
const router = express.Router();
const wrapAsync = require("../Util/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isloggedIn,isOwner ,validatelisting} = require("../middleware.js")
const listingController = require("../controllers/listings.js")

const {storage } = require("../cloudConfig.js");
const multer = require("multer");
const upload = multer({storage});
//Index Route ,create route
router.route("/")
.get(wrapAsync(listingController.index))
.post(isloggedIn,
    upload.single("listing[image]"),
    validatelisting,
    wrapAsync(listingController.createListing));


//New Route
router.get("/new", isloggedIn,listingController.renderNewForm);

//show route edit route update route
router.route("/:id")
.get(wrapAsync(listingController.showListing))

.put(isloggedIn, 
isOwner,
upload.single("listing[image]"),
validatelisting, 
wrapAsync(listingController.updateListing))

.delete(isloggedIn,
isOwner,
wrapAsync(listingController.destroyListing));


//Edit Route
router.get("/:id/edit", 
isloggedIn,
isOwner,
wrapAsync(listingController.renderEditForm)
);



module.exports = router;