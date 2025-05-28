"use client";
import React, { useState } from "react";

/**
 * Main TicTacToe Classic Container.
 * Two players (X, O) take turns to play.
 * Features: 3x3 grid, win/draw detection, turn indicator, and reset.
 * Light, clean design with specified color scheme.
 */

const COLOR_PRIMARY = "#ffffff";
const COLOR_SECONDARY = "#222222";
const COLOR_ACCENT = "#4caf50";

const initialBoard = Array(9).fill(null);

/**
 * Checks for winner, returns "X" | "O" | null.
 */
// PUBLIC_INTERFACE
function checkWinner(
  squares: (string | null)[]
): "X" | "O" | null {
  /** Returns "X", "O", or null for no win yet. */
  const lines = [
    [0, 1, 2], // rows
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6], // cols
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8], // diagonals
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a] as "X" | "O";
    }
  }
  return null;
}

/**
 * Checks if board is full and no winner.
 */
// PUBLIC_INTERFACE
function checkDraw(squares: (string | null)[]): boolean {
  /** Returns true if board is full and no winner. */
  return squares.every((cell) => cell) && !checkWinner(squares);
}

// PUBLIC_INTERFACE
export default function TicTacToeClassic() {
  const [board, setBoard] = useState([...initialBoard]);
  const [isXNext, setIsXNext] = useState(true);
  const winner = checkWinner(board);
  const draw = checkDraw(board);

  // PUBLIC_INTERFACE
  function handleCellClick(idx: number) {
    if (board[idx] || winner) return; // Ignore if cell filled or game over
    const boardCopy = board.slice();
    boardCopy[idx] = isXNext ? "X" : "O";
    setBoard(boardCopy);
    setIsXNext((prev) => !prev);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard([...initialBoard]);
    setIsXNext(true);
  }

  // PUBLIC_INTERFACE
  function renderCell(idx: number) {
    const value = board[idx];
    let color;
    if (value === "X") color = COLOR_SECONDARY;
    else if (value === "O") color = COLOR_ACCENT;
    else color = "transparent";
    return (
      <button
        key={idx}
        className="cell"
        aria-label={`Tic-tac-toe cell ${idx + 1}`}
        onClick={() => handleCellClick(idx)}
        disabled={!!board[idx] || winner}
        style={{
          color,
          background: COLOR_PRIMARY,
          border: `2px solid #e0e0e0`,
          fontWeight: "700",
          fontSize: "2.3rem",
          height: "70px",
          width: "70px",
          cursor: !board[idx] && !winner ? "pointer" : "not-allowed",
          borderRadius: "10px",
          transition: "background 0.1s, transform 0.08s",
          outline: "none",
          boxShadow: "0 0 0 1px rgba(34,34,34,0.06)",
        }}
      >
        {value}
      </button>
    );
  }

  let statusMessage;
  if (winner) {
    statusMessage = (
      <span>
        <span style={{ color: winner === "X" ? COLOR_SECONDARY : COLOR_ACCENT, fontWeight: "700" }}>
          Player {winner}
        </span>{" "}
        wins!
      </span>
    );
  } else if (draw) {
    statusMessage = <span>It’s a draw!</span>;
  } else {
    statusMessage = (
      <span>
        Next:
        <span
          style={{
            color: isXNext ? COLOR_SECONDARY : COLOR_ACCENT,
            fontWeight: "bold",
            marginLeft: 6,
          }}
        >
          Player {isXNext ? "X" : "O"}
        </span>
      </span>
    );
  }

  return (
    <main
      className="ttt-container"
      style={{
        minHeight: "100vh",
        background: COLOR_PRIMARY,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "2.5rem",
        fontFamily: "var(--font-geist-sans), Arial, Helvetica, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "2.2rem",
          fontWeight: 700,
          letterSpacing: ".015em",
          color: COLOR_SECONDARY,
          marginBottom: "18px",
        }}
      >
        Tic Tac Toe Classic
      </h1>
      <div
        className="ttt-status"
        style={{
          fontSize: "1.25rem",
          marginBottom: "6px",
          fontWeight: 500,
          minHeight: "1.75rem",
        }}
        data-testid="status-message"
      >
        {statusMessage}
      </div>
      <div
        className="ttt-board"
        style={{
          display: "grid",
          gridTemplateRows: "repeat(3, 1fr)",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "14px",
          marginBottom: "22px",
        }}
        role="grid"
        aria-label="Tic-tac-toe board"
      >
        {Array.from({ length: 9 }, (_, idx) => renderCell(idx))}
      </div>
      <button
        className="restart-btn"
        onClick={handleRestart}
        style={{
          background: COLOR_ACCENT,
          color: COLOR_PRIMARY,
          padding: "0.6rem 1.7rem",
          fontWeight: "600",
          fontSize: "1.1rem",
          borderRadius: "9px",
          border: "none",
          transition: "background 0.13s",
          boxShadow: "0 1px 4px 0 #0001",
          cursor: "pointer",
          marginTop: "10px",
        }}
        aria-label="Restart game"
      >
        Restart
      </button>
      <footer
        style={{
          marginTop: "44px",
          fontSize: "0.95rem",
          color: "#888",
          opacity: 0.85,
        }}
      >
        <span>Built with Next.js &mdash; Two Player Classic Edition</span>
      </footer>
      {/* Extra scoped styles for a11y highlight/focus, mobile, etc. */}
      <style jsx global>{`
        .ttt-board button.cell:focus-visible {
          outline: 3px solid ${COLOR_ACCENT};
          z-index: 2;
        }
        @media (max-width: 520px) {
          .ttt-board button.cell {
            width: 52px;
            height: 52px;
            font-size: 1.42rem;
          }
        }
      `}</style>
    </main>
  );
}
