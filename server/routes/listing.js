import express from "express";

import upload from "../utils/multer.js";
import { createListing, getListing, getListingDetails } from "../controllers/listing.controller.js";

const router = express.Router();
router.post("/createListing", upload.array("listingPhotos"), createListing);
router.get('/', getListing);
router.get('/:listingId',  getListingDetails);

export default router;