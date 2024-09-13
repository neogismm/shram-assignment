import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { Github, X } from 'lucide-react';

export default function LoginModal() {
  const { user, fetchUserData } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsOpen(true);
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }, [user]);

  const handleGithubLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/github`;
  };

  const handleClose = () => {
    if (isLoggedIn) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      if (isOpen && !isLoggedIn) {
        await fetchUserData();
      }
    };
    checkLoginStatus();
  }, [isOpen, isLoggedIn, fetchUserData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {isLoggedIn ? "You're logged in!" : "Login Required"}
          </h2>
          {isLoggedIn && (
            <button
              onClick={handleClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
          )}
        </div>
        <p className="text-gray-600 mb-6">
          {isLoggedIn
            ? "You've successfully logged in with GitHub."
            : "Please log in to continue using the application."}
        </p>
        {!isLoggedIn && (
          <button
            onClick={handleGithubLogin}
            className="w-full bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center"
          >
            <Github className="mr-2" size={20} />
            Login with GitHub
          </button>
        )}
      </div>
    </div>
  );
}