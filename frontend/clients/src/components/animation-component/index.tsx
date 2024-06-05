"use client";

import { HTMLMotionProps, motion } from "framer-motion";

interface MotionAnimateFormProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
}

const AnimationComponent = ({ children, ...props }: MotionAnimateFormProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        display: "none",
        x: 200,
      }}
      animate={{
        opacity: 1,
        display: "flex",
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -200,
        transition: {
          delay: 0,
          duration: 0.3,
        },
      }}
      transition={{
        delay: 0.6,
        duration: 0.3,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export { AnimationComponent };
