import express from 'express';
import { getUserBookings, createBooking, cancelBooking } from '../controllers/bookingController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getUserBookings);
router.post('/', authMiddleware, createBooking);
router.delete('/:id', authMiddleware, cancelBooking);

export default router;
