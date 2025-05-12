import React from "react";

export default function ShotClock({ time, label }) {
  return (
    <div className="shot-clock">
<div className="timer-label">{label.text}</div>
<div className="timer-value">{time} {label.unit}</div>
    </div>
  );
}
