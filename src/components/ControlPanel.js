import React from "react";

const colors = ["red", "yellow", "green", "brown", "blue", "pink", "black"];

export default function ControlPanel({ onStart, onStop, isRunning, onScore, playerNames }) {
  return (
    <div className="control-panel">
      {!isRunning ? (
        <button onClick={onStart}>Start</button>
      ) : (
        <button onClick={onStop}>Stop</button>
      )}
      <div className="buttons">
        <h3>{playerNames.player1}</h3>
        {colors.map((color) => (
          <button key={color} onClick={() => onScore("player1", color)}>{color}</button>
        ))}
        <button onClick={() => onScore("player1", "foul")}>virhepiste</button>
        <hr />
        <h3>{playerNames.player2}</h3>
        {colors.map((color) => (
          <button key={color + "2"} onClick={() => onScore("player2", color)}>{color}</button>
        ))}
        <button onClick={() => onScore("player2", "foul")}>virhepiste</button>
      </div>
    </div>
  );
}