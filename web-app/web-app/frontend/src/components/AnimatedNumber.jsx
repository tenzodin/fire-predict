// src/components/AnimatedNumber.jsx
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedNumber({ value }) {
  const spring = useSpring(0, {
    stiffness: 30,   // lower = slower acceleration
    damping: 12,     // lower = bouncier and slower stop
    mass: 1.2,       // slight mass helps smoothness
  });

  const display = useTransform(spring, (val) => Math.round(val));

  useEffect(() => {
    if (value !== null) {
      spring.set(value); // animate to new value
    }
  }, [value]);

  return <motion.span>{display}</motion.span>;
}
