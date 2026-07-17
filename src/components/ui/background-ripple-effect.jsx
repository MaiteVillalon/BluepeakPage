"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Dark-mode palette: líneas y glow sutiles sobre fondo oscuro
const BORDER = "rgba(255,255,255,0.08)";
const FILL   = "rgba(255,255,255,0.02)";
const SHADOW = "0px 0px 12px 2px rgba(255,255,255,0.25) inset";

export const BackgroundRippleEffect = ({ cellSize = 64 }) => {
  const ref = useRef(null);

  const [numCols, setNumCols] = useState(() =>
    typeof window !== "undefined" ? Math.ceil(window.innerWidth  / cellSize) + 1 : 25
  );
  const [numRows, setNumRows] = useState(() =>
    typeof window !== "undefined" ? Math.ceil(window.innerHeight / cellSize) + 1 : 15
  );
  const [clicked, setClicked]     = useState(null);
  const [rippleKey, setRippleKey] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect;
      setNumCols(Math.ceil(width  / cellSize) + 1);
      setNumRows(Math.ceil(height / cellSize) + 1);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [cellSize]);

  const cells = useMemo(
    () => Array.from({ length: numRows * numCols }, (_, i) => i),
    [numRows, numCols]
  );

  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: `repeat(${numCols}, ${cellSize}px)`,
        gridTemplateRows:    `repeat(${numRows}, ${cellSize}px)`,
      }}
    >
      {cells.map((idx) => {
        const row  = Math.floor(idx / numCols);
        const col  = idx % numCols;
        const dist = clicked
          ? Math.hypot(clicked.row - row, clicked.col - col)
          : 0;

        return (
          <div
            key={`${rippleKey}-${idx}`}
            className={cn(
              // `cell` referenciado en prefers-reduced-motion de index.css
              "cell border cursor-pointer",
              clicked && "animate-cell-ripple [animation-fill-mode:none]"
            )}
            style={{
              backgroundColor: FILL,
              borderColor: BORDER,
              boxShadow: SHADOW,   // glow siempre presente; la animación lo hace pulsar
              opacity: 0.4,        // opacidad base; el ripple sube a 0.8
              ...(clicked
                ? {
                    "--delay":    `${Math.max(0, dist * 48)}ms`,
                    "--duration": `${180 + dist * 90}ms`,
                  }
                : {}),
            }}
            onClick={() => {
              setClicked({ row, col });
              setRippleKey((k) => k + 1);
            }}
          />
        );
      })}
    </div>
  );
};
