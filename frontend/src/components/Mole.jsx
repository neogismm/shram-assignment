import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dirtImg from "../assets/dirt.svg";
import moleImg from "../assets/mole.svg";
import bombGif from "../assets/bomb.gif";

export default function Mole({ isActive, onWhack }) {
  const [showBomb, setShowBomb] = useState(false);

  useEffect(() => {
    let timer;
    if (showBomb) {
      timer = setTimeout(() => {
        setShowBomb(false);
      }, 800); // Adjust this duration as needed
    }
    return () => clearTimeout(timer);
  }, [showBomb]);

  const handleWhack = () => {
    if (isActive) {
      setShowBomb(true);
      onWhack();
    }
  };

  return (
    <motion.div
      className="bg-brown-600 w-24 h-24 rounded-full mx-auto cursor-pointer relative"
      animate={{
        y: isActive ? [0, -50, 0] : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      onClick={handleWhack}
    >
      <motion.div
        className="w-full h-full bg-brown-800 relative overflow-hidden"
        animate={{
          y: isActive ? "0%" : "100%",
        }}
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 30,
        }}
      >
        {isActive && !showBomb && (
          <img src={moleImg} alt="Mole" className="w-full h-full" />
        )}
      </motion.div>
      <div className="relative w-full h-full">
        <img src={dirtImg} alt="Dirt" className="w-full h-full" />
        {showBomb && (
          <img
            src={bombGif}
            alt="Explosion"
            className="absolute -top-20 left-0 w-full h-full"
          />
        )}
      </div>
    </motion.div>
  );
}
