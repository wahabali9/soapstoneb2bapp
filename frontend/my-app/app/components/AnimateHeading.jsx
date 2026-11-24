"use client";
import { useEffect, useState } from "react";

export default function AnimatedHeading({
  firstText = "Mine to FOB",
  secondText = "Our Mineral Portfolio",
  className = "",
  typingSpeed = 110,  // har letter type hone ki speed (ms)
  deletingSpeed = 75, // har letter mitne ki speed (ms)
}) {
  const texts = [firstText, secondText];
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentFullText = texts[textIndex];
    let timer;

    if (!isDeleting) {
      if (displayedText.length < currentFullText.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Poora type hote hi bina ruke foran mitna shuru
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, typingSpeed);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        // Poora mit-te hi bina ruke foran agla text type hona shuru
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, textIndex, firstText, secondText, typingSpeed, deletingSpeed]);

  return (
    <div className="min-h-[3.5rem] flex items-center justify-center">
      <h2 className={className} aria-label={texts[textIndex]}>
        <span>{displayedText}</span>
        <span className="inline-block w-[3px] h-[0.9em] bg-teal-400 ml-1 align-middle animate-pulse" />
      </h2>
    </div>
  );
}