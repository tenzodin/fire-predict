// src/components/AnimatedNumber.jsx
import { motion, useSpring, useTransform } from "framer-motion";

export default function AnimatedNumber({ value }) {
  const spring = useSpring(value ?? 0, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, (val) => Math.round(val));
  
  return <motion.span>{display}</motion.span>;
}
