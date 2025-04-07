import React from "react";
import Settings from "../components/Settings";

export default function SettingsPage({
  language,
  setLanguage,
  playerNames,
  setPlayerNames,
  onBack,
}) {
  return (
    <div className="settings-page">
      <h1>Settings Page</h1>
      <button onClick={onBack}>Back to Game</button>
      <Settings
        language={language}
        setLanguage={setLanguage}
        playerNames={playerNames}
        setPlayerNames={setPlayerNames}
      />
    </div>
  );
}
