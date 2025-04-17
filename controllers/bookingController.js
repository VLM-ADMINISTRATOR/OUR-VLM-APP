import Booking from '../models/Booking.js';

export const createBooking = async (req, res) => {
  const { game, time, date } = req.body;

  if (!game || !time || !date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const booking = await Booking.create({
    user: req.user._id,
    game,
    time,
    date,
  });

  res.status(201).json(booking);
};

export const getUserBookings = async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(bookings);
};

export const cancelBooking = async (req, res) => {
  const booking = await Booking.findOne({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }

  await booking.deleteOne();
  res.json({ message: 'Booking canceled' });
};
