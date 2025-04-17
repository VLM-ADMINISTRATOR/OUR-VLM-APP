import { useState } from 'react';

const BookingModal = ({ isOpen, onClose, gameTitle, onConfirm }) => {
  const [slot, setSlot] = useState("6 PM");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm text-gray-900 shadow-xl">
        <h2 className="text-xl font-bold mb-4">Book Slot for {gameTitle}</h2>

        <label className="block mb-2 font-medium">Choose Time Slot:</label>
        <select
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={slot}
          onChange={(e) => setSlot(e.target.value)}
        >
          <option>4 PM</option>
          <option>5 PM</option>
          <option>6 PM</option>
          <option>7 PM</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 text-sm"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(gameTitle, slot)}
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
