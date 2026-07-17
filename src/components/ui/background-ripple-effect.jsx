"use client";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
}) => {
  return (
    <div
      className={cn(
        "absolute inset-0 h-full w-full isolate",
        "[--cell-border-color:rgba(200,200,200,0.40)]",
        "[--cell-fill-color:rgba(255,255,255,0.90)]"
      )}
    >
      <div className="relative h-auto w-auto overflow-hidden">
        <DivGrid
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
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
  fillColor = "rgba(255,255,255,0.90)",
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
      {cells.map((idx) => (
        <div
          key={idx}
          className="relative border pointer-events-none"
          style={{ backgroundColor: fillColor, borderColor }}
        />
      ))}
    </div>
  );
};
