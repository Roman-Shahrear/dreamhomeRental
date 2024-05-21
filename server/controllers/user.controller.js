import User from '../models/User.js';
import Listing from '../models/Listing.js';
import Booking from '../models/Booking.js';

/* ---- Get Trip List ---- */
export const getTripList = async (req, res, next) => {
    try {
        const { userId } = req.params
        const trips = await Booking.find({ customerId: userId }).populate('customerId hostId listingId'); 
        res.status(202).json(trips);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: 'Can not find Trips', error: error.message });
    };
};

/* ---- Interact with WishList ---- */
export const interactWishlist = async (req, res, next) => {
    try {
        const { userId, listingId } = req.params;
        const user = await User.findById(userId);
        const listing = await Listing.findById(listingId).populate('creator');

        const favoriteListing = user.wishList.find((item) => item._id.toString() === listingId);
        
        if(favoriteListing) {
            user.wishList = user.wishList.find((item) => item._id.toString() !== listingId);
            await user.save();
            res.status(200).json({message: 'Listing is removed from wish list', wishList: user.wishList});
        }else {
            user.wishList.push(listing);
            await user.save();
            res.status(200).json({ message: `Listing is added to wish list`, wishList: user.wishList});
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ error: error.message});
    }
}