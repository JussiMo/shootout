import React, { useState } from "react";
import Settings from "../components/Settings";
import translations from "../utils/translations";

export default function SettingsPage({
  language,
  setLanguage,
  playerNames,
  setPlayerNames,
  foulPoints,
  onBack,
  resetGame,
}) {
  const t = translations[language];
  const [showConfirm, setShowConfirm] = useState(false);

  const handleCloseApp = () => {
    setShowConfirm(true);
  };

  const confirmClose = () => {
    window.close();
  };

  return (
    <div className="settings-page">
      <button onClick={onBack} className="back-btn">X</button>

      <Settings
        language={language}
        setLanguage={setLanguage}
        playerNames={playerNames}
        setPlayerNames={setPlayerNames}
        foulPoints={foulPoints}
      />

      <button onClick={resetGame} className="settings-reset-btn">
        {t.resetGame}
      </button>

      <button className="close-app-btn" onClick={handleCloseApp}>
        {t.closeApp}
      </button>


      {showConfirm && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>{t.confirmCloseTitle}</h3>
            <p>{t.confirmCloseMessage}</p>
            <div className="modal-actions">
              <button onClick={confirmClose}>{t.confirmYes}</button>
              <button onClick={() => setShowConfirm(false)}>{t.confirmNo}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
