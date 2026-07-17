"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import { cn } from "@/lib/utils";

export const BackgroundRippleEffect = ({ cellSize = 64 }) => {
  const containerRef = useRef(null);
  // Inicializa desde window para evitar flash antes del primer ResizeObserver
  const [dims, setDims] = useState(() => ({
    rows: typeof window !== "undefined" ? Math.ceil(window.innerHeight / cellSize) + 1 : 15,
    cols: typeof window !== "undefined" ? Math.ceil(window.innerWidth  / cellSize) + 1 : 30,
  }));
  const [clickedCell, setClickedCell] = useState(null);
  const [rippleKey, setRippleKey] = useState(0);

  // Recalcula rows/cols cada vez que el contenedor cambia de tamaño
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setDims({
        rows: Math.ceil(height / cellSize) + 1,
        cols: Math.ceil(width  / cellSize) + 1,
      });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [cellSize]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 h-full w-full isolate overflow-hidden",
        "[--cell-border-color:rgba(200,200,200,0.35)]",
        "[--cell-fill-color:rgba(255,255,255,0.90)]",
        "[--cell-shadow-color:rgba(255,255,255,0.90)]"
      )}
    >
      <DivGrid
        key={`grid-${rippleKey}`}
        rows={dims.rows}
        cols={dims.cols}
        cellSize={cellSize}
        borderColor="var(--cell-border-color)"
        fillColor="var(--cell-fill-color)"
        clickedCell={clickedCell}
        onCellClick={(row, col) => {
          setClickedCell({ row, col });
          setRippleKey(k => k + 1);
        }}
      />
    </div>
  );
};

const DivGrid = ({
  rows = 10,
  cols = 20,
  cellSize = 64,
  borderColor = "rgba(200,200,200,0.35)",
  fillColor = "rgba(255,255,255,0.90)",
  clickedCell = null,
  onCellClick = () => {},
}) => {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols]
  );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
        gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
        // Ancla el grid en la esquina superior-izquierda
        position: "absolute",
        top: 0,
        left: 0,
      }}
    >
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols);
        const colIdx = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay    = clickedCell ? Math.max(0, distance * 48) : 0;
        const duration = 180 + distance * 90;

        return (
          <div
            key={idx}
            className={cn(
              "cell relative border cursor-pointer",
              clickedCell && "animate-cell-ripple [animation-fill-mode:none]"
            )}
            style={{
              backgroundColor: fillColor,
              borderColor,
              ...(clickedCell
                ? { "--delay": `${delay}ms`, "--duration": `${duration}ms` }
                : {}),
            }}
            onClick={() => onCellClick(rowIdx, colIdx)}
          />
        );
      })}
    </div>
  );
};
