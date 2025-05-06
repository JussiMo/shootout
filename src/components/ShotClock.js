import React from "react";

export default function ShotClock({ time, label, maxTime = 15 }) {
  const segments = Array.from({ length: maxTime }, (_, i) => i < time);

  return (
    <div className="shot-clock">
      <div className="timer-label">{label}</div>
      <div className="timer-value">{time} sec</div>

      <div className="shot-bar-wrapper">
        {segments.map((isFilled, i) => (
          <div
            key={i}
            className={`shot-segment ${isFilled ? "filled" : ""}`}
          ></div>
        ))}
      </div>
    </div>
  );
}

