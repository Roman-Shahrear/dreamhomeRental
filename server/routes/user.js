import express from 'express';
import { getPropertyList, getReservationList, getTripList, interactWishlist } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/:userId/trips', getTripList);
router.patch('/:userId/:listingId', interactWishlist);
router.get('/:userId/properties', getPropertyList);
router.get('/:userId/reservations', getReservationList);

export default router;