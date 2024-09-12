import { motion } from "framer-motion";
import dirtImg from "../assets/dirt.svg";
import moleImg from "../assets/mole.svg";

export default function Mole({ isActive, onWhack }) {
  return (
    <motion.div
      className="bg-brown-600 w-24 h-24 rounded-full mx-auto cursor-pointer"
      animate={{
        y: isActive ? [0, -50, 0] : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 30,
      }}
      onClick={onWhack}
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
        {isActive && (
          <img src={moleImg} alt="dirt" className="w-full h-full" />
        )}
      </motion.div>
      <img src={dirtImg} alt="dirt" className="w-full h-full " />
    </motion.div>
  );
}
