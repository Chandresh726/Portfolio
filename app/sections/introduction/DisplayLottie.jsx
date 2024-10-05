import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Lottie from "react-lottie";

const GreetingLottie = ({ animationPath }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const defaultOptions = {
    loop: true,
    autoplay: true,
    path: animationPath,
  };

  return (
    <motion.div
      ref={ref}
      style={{
        transform: isInView ? "none" : "translateX(-200px)",
        opacity: isInView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s",
      }}
    >
      <Lottie options={defaultOptions} />
    </motion.div>
  );
};

export default GreetingLottie;