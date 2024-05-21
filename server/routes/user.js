import express from 'express';
import { getTripList, interactWishlist } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/:userId/trips', getTripList);
router.patch('/:userId/:listingId', interactWishlist);

export default router;