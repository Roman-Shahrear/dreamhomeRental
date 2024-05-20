import Listing from '../models/Listing.js';
import User from '../models/User.js';

/* --------! Create Listing !------------ */
export const createListing = async (req, res, next) => {
    try {
        /* Take the information from the form */
        const {
          creator,
          category,
          type,
          streetAddress,
          aptSuite,
          city,
          province,
          country,
          guestCount,
          bedroomCount,
          bedCount,
          bathroomCount,
          amenities,
          title,
          description,
          highlight,
          highlightDesc,
          price,
        } = req.body;
    
        const listingPhotos = req.files
    
        if (!listingPhotos) {
          return res.status(400).send("No file uploaded.")
        }
    
        const listingPhotoPaths = listingPhotos.map((file) => file.path)
    
        const newListing = new Listing({
          creator,
          category,
          type,
          streetAddress,
          aptSuite,
          city,
          province,
          country,
          guestCount,
          bedroomCount,
          bedCount,
          bathroomCount,
          amenities,
          listingPhotoPaths,
          title,
          description,
          highlight,
          highlightDesc,
          price,
        })
    
        await newListing.save()
    
        res.status(200).json(newListing)
      } catch (err) {
        res.status(409).json({ message: "Fail to create Listing", error: err.message })
        console.log(err)
      };  
};


/* --------! Get Listing By Category !------------ */
export const getListing = async (req, res, next) => {
    const qCategory = req.query.category;

    try {
        let listings;
        if(qCategory) {
            listings = await Listing.find({ category: qCategory }).populate('creator');
        } else {
            listings = await Listing.find().populate('creator');
        }

        res.status(200).json(listings);
    } catch (err) {
        res.status(404).json({ message: "Fail to fetch listings", error: err.message });
        console.log(err);
    };
};

/* --------! Get Listing Details By lsitingId !------------ */
export const getListingDetails = async (req, res, next) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    res.status(202).json(listing);
  } catch (err) {
    res.status(404).json({message: `Listing can nor found`, error: err.message});
  }
}