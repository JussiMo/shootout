import React from "react";
import Settings from "../components/Settings";

export default function SettingsPage({
  language,
  setLanguage,
  playerNames,
  setPlayerNames,
  foulPoints,
  setFoulPoints,
  onBack,
  resetGame,
}) {
  return (
    <div className="settings-page">
      <button onClick={onBack} className="back-btn">X</button>
      <Settings
        language={language}
        setLanguage={setLanguage}
        playerNames={playerNames}
        setPlayerNames={setPlayerNames}
        foulPoints={foulPoints}
        setFoulPoints={setFoulPoints}
      />

      <button onClick={resetGame} className="settings-reset-btn">
        Reset Game
      </button>
    </div>
  );
}
