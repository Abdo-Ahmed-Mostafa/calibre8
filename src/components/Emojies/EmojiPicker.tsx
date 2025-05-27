// components/EmojiPicker.tsx
import React, { useEffect, useRef } from "react";
import emojiList from "emoji.json";

const EmojiPicker = ({
  onSelect,
  onClose,
}: {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="absolute bottom-12 right-0 z-50 bg-white border rounded-xl shadow-lg p-3 w-[300px] h-[200px] overflow-y-auto grid grid-cols-8 gap-2"
    >
      {emojiList.slice(0, 200).map((emoji, index) => (
        <button
          key={index}
          className="text-xl hover:scale-125 transition"
          onClick={() => onSelect(emoji.char)}
        >
          {emoji.char}
        </button>
      ))}
    </div>
  );
};

export default EmojiPicker;
