import React from "react";

export default function Scoreboard({ scores, playerNames }) {
  return (
    <div className="scoreboard">
      <div>{playerNames.player1} Score: {scores.player1}</div>
      <div>{playerNames.player2} Score: {scores.player2}</div>
    </div>
  );
}