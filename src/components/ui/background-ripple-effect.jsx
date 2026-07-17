"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 64,
}) => {
  const [clickedCell, setClickedCell] = useState(null);
  const [rippleKey, setRippleKey]     = useState(0);
  const ref = useRef(null);

  // Dispara ondas automáticas cada ~2.4 s desde posiciones aleatorias
  useEffect(() => {
    const fire = () => {
      const row = Math.floor(Math.random() * rows);
      const col = Math.floor(Math.random() * cols);
      setClickedCell({ row, col });
      setRippleKey(k => k + 1);
    };
    fire();
    const id = setInterval(fire, 2400);
    return () => clearInterval(id);
  }, [rows, cols]);

  const triggerRipple = (row, col) => {
    setClickedCell({ row, col });
    setRippleKey(k => k + 1);
  };

  return (
    <div
      ref={ref}
      /*
       * Colores claros: borde e iluminación basados en --color-hielo.
       * `isolate` contiene z-[2]/z-[3] dentro de este stacking context.
       */
      className={cn(
        "absolute inset-0 h-full w-full isolate",
        "[--cell-border-color:rgba(214,224,238,0.22)]",
        "[--cell-fill-color:rgba(214,224,238,0.04)]",
        "[--cell-shadow-color:rgba(214,224,238,0.48)]"
      )}
    >
      <div className="relative h-auto w-auto overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-[2] h-full w-full overflow-hidden" />
        <DivGrid
          key={`base-${rippleKey}`}
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clickedCell}
          onCellClick={triggerRipple}
          interactive
        />
      </div>
    </div>
  );
};

const DivGrid = ({
  rows     = 7,
  cols     = 30,
  cellSize = 64,
  borderColor = "rgba(214,224,238,0.22)",
  fillColor   = "rgba(214,224,238,0.04)",
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  );

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows:    `repeat(${rows}, ${cellSize}px)`,
    width:  cols * cellSize,
    height: rows * cellSize,
    marginInline: "auto",
  };

  return (
    <div className="relative z-[3]" style={gridStyle}>
      {cells.map(idx => {
        const rowIdx   = Math.floor(idx / cols);
        const colIdx   = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay    = clickedCell ? Math.max(0, distance * 48) : 0;
        const duration = 180 + distance * 90;

        const rippleStyle = clickedCell
          ? { "--delay": `${delay}ms`, "--duration": `${duration}ms` }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border-[0.5px] opacity-[0.28] transition-opacity duration-150",
              "will-change-transform",
              "hover:opacity-[0.72]",
              "shadow-[0px_0px_32px_2px_var(--cell-shadow-color)_inset]",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]",
              !interactive && "pointer-events-none"
            )}
            style={{
              backgroundColor: fillColor,
              borderColor,
              ...rippleStyle,
            }}
            onClick={interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined}
          />
        );
      })}
    </div>
  );
};
