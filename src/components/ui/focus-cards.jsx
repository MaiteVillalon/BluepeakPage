"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";

export const Card = React.memo(({ card, index, hovered, setHovered }) => (
  <div
    onMouseEnter={() => setHovered(index)}
    onMouseLeave={() => setHovered(null)}
    className={cn(
      "rounded-sm relative bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out",
      hovered !== null && hovered !== index && "blur-sm scale-[0.98] brightness-75"
    )}
  >
    <img
      src={card.src}
      alt={card.title}
      className="object-cover absolute inset-0 w-full h-full"
    />
    {/* Overlay siempre visible: vignette sutil */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

    {/* Título: visible siempre abajo, se intensifica en hover */}
    <div
      className={cn(
        "absolute inset-0 flex items-end py-5 px-4 transition-opacity duration-300",
        hovered === index ? "opacity-100" : "opacity-60"
      )}
    >
      <div className="text-base md:text-lg font-medium text-neutral-100 leading-snug">
        {card.title}
      </div>
    </div>
  </div>
));

Card.displayName = "Card";

export function FocusCards({ cards }) {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
      {cards.map((card, index) => (
        <Card
          key={card.title}
          card={card}
          index={index}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
