import React from "react";

export default function Settings({ language, setLanguage, playerNames, setPlayerNames, foulPoints, setFoulPoints }) {
  return (
    <div className="settings">
      <h2>Settings / Asetukset</h2>
      <div>
        <label>Language / Kieli: </label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="EN">English</option>
          <option value="FI">Suomi</option>
        </select>
      </div>
      <div>
        <label>{language === "FI" ? "Pelaaja 1" : "Player 1"}:</label>
        <input
          type="text"
          value={playerNames.player1}
          onChange={(e) => setPlayerNames((prev) => ({ ...prev, player1: e.target.value }))}
        />
      </div>
      <div>
        <label>{language === "FI" ? "Pelaaja 2" : "Player 2"}:</label>
        <input
          type="text"
          value={playerNames.player2}
          onChange={(e) => setPlayerNames((prev) => ({ ...prev, player2: e.target.value }))}
        />
      </div>
      <div>
        <label>{language === "FI" ? "Virhepiste" : "Foul point"}: </label>
        <input
          type="number"
          min="1"
          max="7"
          value={foulPoints}
          onChange={(e) => setFoulPoints(Number(e.target.value))}
        />
      </div>

    </div>
  );
}