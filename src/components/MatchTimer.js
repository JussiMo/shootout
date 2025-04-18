import React from "react";

export default function MatchTimer({ time, label }) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return (
    <div className="timer">
      <div className="timer-label">{label}</div>
      <div className="timer-value">
        {minutes}:{seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
}
