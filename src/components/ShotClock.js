import React from "react";

export default function ShotClock({ time, label }) {
  return (
    <div className="shot-clock">
      <div className="timer-label">{label}</div>
      <div className="timer-value">{time}</div>
    </div>
  );
}
