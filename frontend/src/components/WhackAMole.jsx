import React, { useState, useEffect, useCallback } from "react";
import Mole from "./Mole";
import LoginModal from "./LoginModal";

const GAME_DURATION = 30000; // 30 seconds
const MOLE_COUNT = 9;
const MOLE_SHOW_TIME = 800; // 800 ms

export default function WhackAMole({ score, setScore }) {
  const [gameActive, setGameActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION / 1000);
  const [activeMoles, setActiveMoles] = useState(Array(MOLE_COUNT).fill(false));

  const startGame = () => {
    setGameActive(true);
    setScore(0);
    setTimeLeft(GAME_DURATION / 1000);
  };

  const endGame = useCallback(() => {
    setGameActive(false);
    setActiveMoles(Array(MOLE_COUNT).fill(false));
  }, []);

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

  return (
    <div className="text-center">
      <LoginModal />
      <h1 className="text-4xl font-bold mb-4">Whack-A-Mole</h1>
      <div className="mb-4">
        <p className="text-2xl">Score: {score}</p>
        <p className="text-xl">Time Left: {timeLeft}s</p>
      </div>
      {!gameActive && (
        <button
          onClick={startGame}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors"
        >
          Start Game
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
    </div>
  );
}