import React from 'react';
import { useUser } from "../contexts/UserContext";

export default function CongratulationsModal({ isOpen, onClose }) {
  const { user } = useUser();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-lg font-bold mb-4">Congratulations 🎉</h2>
        <p className="text-sm mb-6">
          You've achieved a new personal best: {user.highscore}!
        </p>
        <button
          onClick={onClose}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}