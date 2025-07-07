import React from "react";
import Confetti from "react-confetti";
import { useWindowSize } from "@react-hook/window-size";

const ConfettiCelebration = () => {
  const [width, height] = useWindowSize();
  return <Confetti width={width} height={height} numberOfPieces={300} />;
};

export default ConfettiCelebration;