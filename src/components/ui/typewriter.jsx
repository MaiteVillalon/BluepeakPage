"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

const DEFAULT_TEXTS = ["Interfaces", "Experiences", "Interactions", "Products"];

const CURSOR_VARIANTS = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.01,
      repeat: Infinity,
      repeatDelay: 0.4,
      repeatType: "reverse",
    },
  },
};

export default function Typewriter({
  texts = DEFAULT_TEXTS,
  prefix = "",
  typeSpeed = 70,
  holdTime = 1500,
  deleteSpeed = 100,
  showCursor = true,
  hideCursorOnType = false,
  cursorChar = "_",
  color,
  typedColor,
  cursorColor,
  className,
  style,
}) {
  const list = (texts ?? []).filter((t) => typeof t === "string");
  const hasTexts = list.length > 0;

  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    if (!hasTexts) return;

    let timeout;
    const currentText = list[currentTextIndex] ?? "";

    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % list.length);
        setCurrentIndex(0);
        timeout = setTimeout(() => {}, holdTime);
      } else {
        timeout = setTimeout(
          () => setDisplayText((prev) => prev.slice(0, -1)),
          deleteSpeed
        );
      }
    } else {
      if (currentIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText((prev) => prev + currentText[currentIndex]);
          setCurrentIndex((prev) => prev + 1);
        }, typeSpeed);
      } else if (list.length > 1) {
        timeout = setTimeout(() => setIsDeleting(true), holdTime);
      }
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentIndex,
    displayText,
    isDeleting,
    typeSpeed,
    deleteSpeed,
    holdTime,
    currentTextIndex,
    hasTexts,
  ]);

  const textsKey = list.join("");
  useEffect(() => {
    setDisplayText("");
    setCurrentIndex(0);
    setIsDeleting(false);
    setCurrentTextIndex(0);
  }, [textsKey]);

  const currentText = list[currentTextIndex] ?? "";
  const isActivelyTyping =
    hasTexts && (isDeleting || (currentIndex > 0 && currentIndex < currentText.length));
  const cursorHidden = hideCursorOnType && isActivelyTyping;
  const cursorResolvedColor = cursorColor && cursorColor !== "" ? cursorColor : typedColor;

  return (
    <span className={className} style={{ whiteSpace: "pre-wrap", color, ...style }}>
      {prefix ? <span>{prefix}</span> : null}
      <span style={{ color: typedColor }}>{displayText}</span>
      {showCursor && (
        <motion.span
          variants={CURSOR_VARIANTS}
          initial="initial"
          animate="animate"
          style={{
            color: cursorResolvedColor,
            marginLeft: "0.15em",
            visibility: cursorHidden ? "hidden" : "visible",
          }}
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
}
