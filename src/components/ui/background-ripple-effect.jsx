"use client";
import React, { useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/*
 * BackgroundRippleEffect — adaptado a la paleta Bluepeak.
 *
 * Cambios respecto al original de Aceternity:
 * - `isolate` en el outer div: crea un nuevo stacking context y evita que
 *   los z-index internos (z-[2], z-[3]) sobresalgan por encima del overlay
 *   y el contenido del hero.
 * - Colores adaptados a nuestra paleta (siempre oscuro, sin dark:).
 * - Opacidad base 0.22 y hover 0.58 para no competir con el headline.
 * - Máscara radial eliminada — la grilla cubre el hero completo; el overlay
 *   del hero protege el contraste del texto en la esquina inferior izquierda.
 */

export const BackgroundRippleEffect = ({
  rows = 8,
  cols = 27,
  cellSize = 56,
}) => {
  const [clickedCell, setClickedCell] = useState(null);
  const [rippleKey, setRippleKey]     = useState(0);
  const ref = useRef(null);

  return (
    <div
      ref={ref}
      /*
       * `isolate` contiene los z-index internos (z-[2], z-[3]) dentro de
       * este stacking context, sin interferir con .overlay y .content del hero.
       *
       * Colores de las celdas ajustados a la paleta:
       *   --cell-border-color  → pizarra muy tenue
       *   --cell-fill-color    → tinte de acento casi invisible
       *   --cell-shadow-color  → glow de acento al hacer ripple
       */
      className={cn(
        "absolute inset-0 h-full w-full isolate",
        "[--cell-border-color:rgba(90,106,130,0.18)]",
        "[--cell-fill-color:rgba(91,110,245,0.05)]",
        "[--cell-shadow-color:rgba(132,148,249,0.32)]"
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
            setRippleKey(k => k + 1);
          }}
          interactive
        />
      </div>
    </div>
  );
};

const DivGrid = ({
  rows     = 7,
  cols     = 30,
  cellSize = 56,
  borderColor = "rgba(90,106,130,0.18)",
  fillColor   = "rgba(91,110,245,0.05)",
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
        const rowIdx  = Math.floor(idx / cols);
        const colIdx  = idx % cols;
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0;
        const delay    = clickedCell ? Math.max(0, distance * 55) : 0;
        const duration = 200 + distance * 80;

        const rippleStyle = clickedCell
          ? { "--delay": `${delay}ms`, "--duration": `${duration}ms` }
          : {};

        return (
          <div
            key={idx}
            className={cn(
              // `cell` — referenciado en prefers-reduced-motion de index.css
              "cell relative border-[0.5px] opacity-[0.22] transition-opacity duration-150",
              "will-change-transform",
              "hover:opacity-[0.58]",
              // Glow de acento al hacer ripple (siempre activo, no sólo dark:)
              "shadow-[0px_0px_28px_1px_var(--cell-shadow-color)_inset]",
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
