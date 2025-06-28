import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useState } from "react";

function TypingText({
  words = [
    "AI meets Climate",
    "Ontario's Fire Forecast", 
    "Scanning for wildfire risks…",
    "Predicting environmental hazards…",
    "Analyzing temperature, humidity, wind…",
    "Visualizing high-risk zones…",
    "Protecting forests with AI."
  ],
  typingSpeed = 90,
  deleteSpeed = 60,
  delayBetweenWords = 1400,
}) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const controls = useAnimationControls();

  useEffect(() => {
    const word = words[currentWordIndex];

    if (isDeleting) {
      if (currentText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        return;
      }
      const timer = setTimeout(() => {
        setCurrentText(word.substring(0, currentText.length - 1));
      }, deleteSpeed);
      return () => clearTimeout(timer);
    }

    if (currentText === word) {
      const timer = setTimeout(() => {
        setIsDeleting(true);
      }, delayBetweenWords);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setCurrentText(word.substring(0, currentText.length + 1));
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [
    currentText,
    currentWordIndex,
    isDeleting,
    words,
    typingSpeed,
    deleteSpeed,
    delayBetweenWords,
  ]);

  useEffect(() => {
    controls.start({
      opacity: [0, 1],
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
      },
    });
  }, [controls]);

  return (
    <div className="w-full text-center">
      <span className="text-xl md:text-2xl lg:text-3xl font-mono text-gray-200">
        {currentText}
        <motion.span animate={controls}>|</motion.span>
      </span>
    </div>
  );
}

export default function TypingAnimatedText() {
  return <TypingText />;
}
