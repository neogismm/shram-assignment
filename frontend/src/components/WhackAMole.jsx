import React, { useState, useEffect, useCallback } from "react";
import Confetti from 'react-confetti';
import Mole from "./Mole";
import LoginModal from "./LoginModal";
import CongratulationsModal from "./CongratulationsModal";
import { useUser } from "../contexts/UserContext";
import { RotateCcw } from 'lucide-react';

const GAME_DURATION = 10000; // 10 seconds
const MOLE_COUNT = 9;
const MOLE_SHOW_TIME = 800; // 800 ms

export default function WhackAMole({ score, setScore }) {
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION / 1000);
  const [activeMoles, setActiveMoles] = useState(Array(MOLE_COUNT).fill(false));
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHighScoreModal, setShowHighScoreModal] = useState(false);
  const { user, setUser } = useUser();

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(GAME_DURATION / 1000);
  };

  const resetGame = () => {
    setGameActive(false);
    setScore(0);
    setTimeLeft(GAME_DURATION / 1000);
    setActiveMoles(Array(MOLE_COUNT).fill(false));
  };

  const updateScore = async (score) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/score`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ score }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        console.log("High score updated:", data.highscore);
        if (data.highscore > user.highscore) {
          setShowHighScoreModal(true);
          setShowConfetti(true);
          setUser({ ...user, highscore: data.highscore });
        }
      } else {
        console.error("Failed to update high score:", data.error);
      }
    } catch (error) {
      console.error("Error updating high score:", error);
    }
  };

  const endGame = useCallback(() => {
    setGameActive(false);
    setActiveMoles(Array(MOLE_COUNT).fill(false));
    updateScore(score);
  }, [score]);

  const whackMole = (index) => {
    if (gameActive && activeMoles[index]) {
      setScore((prevScore) => prevScore + 1);
      setActiveMoles((prevMoles) => {
        const newMoles = [...prevMoles];
        newMoles[index] = false;
        return newMoles;
      });
    }
  };

  useEffect(() => {
    let timer;
    if (gameActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(timer);
  }, [gameActive, timeLeft, endGame]);

  useEffect(() => {
    let moleTimer;
    if (gameActive) {
      moleTimer = setInterval(() => {
        setActiveMoles((prevMoles) => {
          const newMoles = Array(MOLE_COUNT).fill(false);
          const inactiveIndices = prevMoles.reduce(
            (acc, mole, index) => (!mole ? [...acc, index] : acc),
            []
          );
          if (inactiveIndices.length > 0) {
            const randomIndex =
              inactiveIndices[
                Math.floor(Math.random() * inactiveIndices.length)
              ];
            newMoles[randomIndex] = true;
          }
          return newMoles;
        });
      }, MOLE_SHOW_TIME);
    }
    return () => clearInterval(moleTimer);
  }, [gameActive]);

  const closeHighScoreModal = () => {
    setShowHighScoreModal(false);
    setShowConfetti(false);
  };

  return (
    <div className="text-center relative">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
          />
        </div>
      )}
      <LoginModal />
      <h1 className="text-4xl font-bold mb-4">Whack-A-Mole</h1>
      <div className="mb-4">
        <p className="text-2xl">Score: {score}</p>
        {user && (
          <p className="text-2xl">Your highest score: {user.highscore}</p>
        )}
        <p className="text-xl">Time Left: {timeLeft}s</p>
      </div>
      {!gameActive && (
        <button
          onClick={startGame}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Start
        </button>
      )}
      {gameActive && (
        <button
          onClick={resetGame}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          <span className="flex gap-2">Retry<RotateCcw /> </span>
        </button>
      )}
      <div className="grid grid-cols-3 gap-20 max-w-md mx-auto mt-8">
        {activeMoles.map((isActive, index) => (
          <Mole
            key={index}
            isActive={isActive}
            onWhack={() => whackMole(index)}
          />
        ))}
      </div>
      <CongratulationsModal
        isOpen={showHighScoreModal}
        onClose={closeHighScoreModal}
      />
    </div>
  );
}