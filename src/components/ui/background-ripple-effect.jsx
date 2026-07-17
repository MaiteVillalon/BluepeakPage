"use client";
import { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
}) => {
  const [clickedCell, setClickedCell] = useState(null);
  const [rippleKey, setRippleKey] = useState(0);
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      className={cn(
        "absolute inset-0 h-full w-full isolate",
        "[--cell-border-color:rgba(200,200,200,0.40)]",
        "[--cell-fill-color:rgba(255,255,255,0.14)]",
        "[--cell-shadow-color:rgba(255,255,255,0.70)]"
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
          onCellClick={(row, col) => {
            setClickedCell({ row, col });
            setRippleKey((k) => k + 1);
          }}
          interactive
        />
      </div>
    </div>
  );
};

const DivGrid = ({
  rows = 7,
  cols = 30,
  cellSize = 56,
  borderColor = "rgba(200,200,200,0.40)",
  fillColor = "rgba(255,255,255,0.14)",
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
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: "auto",
  };

  return (
    <div className="relative z-[3]" style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay = clickedCell ? Math.max(0, distance * 48) : 0;
        const duration = 180 + distance * 90;

        const rippleStyle = clickedCell
          ? { "--delay": `${delay}ms`, "--duration": `${duration}ms` }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border transition-opacity duration-150",
              "will-change-transform",
              "hover:opacity-100",
              clickedCell && "shadow-[0px_0px_24px_2px_var(--cell-shadow-color)_inset]",
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