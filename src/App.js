import React, { useState, useEffect } from "react";
import SnookerTimer from "./screens/SnookerTimer";
import SettingsPage from "./screens/SettingsPage";
import "./styles/style.css";

function App() {
  const [showSettings, setShowSettings] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [playerNames, setPlayerNames] = useState({
    player1: "Player 1",
    player2: "Player 2",
  });

  // Close settings on Esc key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setShowSettings(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <div className="app-container">

      <SnookerTimer
        language={language}
        playerNames={playerNames}
        setPlayerNames={setPlayerNames}
        onOpenSettings={() => setShowSettings(true)}
        settingsOpen={showSettings}
      />

      {showSettings && (
        <div className="settings-modal-wrapper">
          <div
            className="settings-modal-overlay"
            onClick={() => setShowSettings(false)}
          ></div>

          <div className="settings-modal-card">
            <SettingsPage
              language={language}
              setLanguage={setLanguage}
              playerNames={playerNames}
              setPlayerNames={setPlayerNames}
              onBack={() => setShowSettings(false)}
              resetGame={() => window.location.reload()} // simple full reset

            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
