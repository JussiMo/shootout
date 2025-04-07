import React from "react";

export default function MatchTimer({ time }) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    <div className="timer">
      Match Timer: {minutes}:{seconds.toString().padStart(2, "0")}
    </div>
  );
}