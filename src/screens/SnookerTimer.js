import React, { useState, useEffect, useRef } from "react";
import ShotClock from "../components/ShotClock";
import MatchTimer from "../components/MatchTimer";
import "../styles/style.css";
import translations from "../utils/translations";

export default function SnookerTimer({ language, playerNames, setPlayerNames, onOpenSettings, settingsOpen }) {
  const [matchTime, setMatchTime] = useState(600);
  const [matchStarted, setMatchStarted] = useState(false);
  const [shotClock, setShotClock] = useState(15);
  const [playerScores, setPlayerScores] = useState({ player1: 0, player2: 0 });
  const [isShotClockRunning, setIsShotClockRunning] = useState(false);
  const t = translations[language];

  const sounds = useRef({
    "5minEN": new Audio("/5minEN.mp3"),
    "5minFI": new Audio("/5minFI.mp3"),
    gameOverEN: new Audio("/gameOverEN.mp3"),
    gameOverFI: new Audio("/gameOverFI.mp3"),
    shortBeep: new Audio("/shortBeep.mp3"),
    longBeep: new Audio("/longBeep.mp3"),
  });

  useEffect(() => {
    Object.values(sounds.current).forEach((audio) => audio.load());
  }, []);

  useEffect(() => {
    let matchTimer;
    if (matchStarted && matchTime > 0) {
      matchTimer = setInterval(() => setMatchTime((prev) => prev - 1), 1000);
      if (matchTime === 300) playSound(`5min${language}`);
      if (matchTime === 0) playSound(`gameOver${language}`);
    }
    return () => clearInterval(matchTimer);
  }, [matchTime, language, matchStarted]);

  useEffect(() => {
    let shotTimer;
    if (isShotClockRunning && shotClock > 0) {
      shotTimer = setInterval(() => {
        setShotClock((prev) => {
          const newTime = prev - 1;
          if (newTime > 0 && newTime <= 5) playSound("shortBeep");
          if (newTime === 0) {
            playSound("longBeep");
            setIsShotClockRunning(false);
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(shotTimer);
  }, [isShotClockRunning, shotClock]);

  function playSound(type) {
    const sound = sounds.current[type];
    if (sound) {
      sound.currentTime = 0;
      sound.play();
    }
  }

  function startShotClock() {
    if (shotClock <= 0) {
      setShotClock(matchTime > 300 ? 15 : 10);
    }
    setIsShotClockRunning(true);
  }

  function stopShotClock() {
    setIsShotClockRunning(false);
    setShotClock(matchTime > 300 ? 15 : 10);
  }

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!settingsOpen && e.code === "Space") {
        e.preventDefault();
        if (isShotClockRunning) {
          stopShotClock();
        } else {
          startShotClock();
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isShotClockRunning, settingsOpen]);



  function addPoints(player, type) {
    const ballPoints = {
      red: 1,
      yellow: 2,
      green: 3,
      brown: 4,
      blue: 5,
      pink: 6,
      black: 7,
      foul: 5,
    };
    setPlayerScores((prev) => ({
      ...prev,
      [player]: prev[player] + ballPoints[type],
    }));
    setShotClock(matchTime > 300 ? 15 : 10);
    setIsShotClockRunning(false);
  }

  function resetGame() {
    setMatchTime(600);
    setMatchStarted(false);
    setShotClock(15);
    setPlayerScores({ player1: 0, player2: 0 });
    setIsShotClockRunning(false);
  }

  return (
    <div className="snooker-app">
      {/* Top Section: Settings + Match Timer Box */}
      <div className="top-bar">
        <div className="settings-container">
          <button onClick={onOpenSettings} className="settings-btn">
            {t.settings}
          </button>
        </div>

        <div className="top-box">
          <MatchTimer time={matchTime} label={t.matchTimer} />

          <div className="match-controls">
            <button
              onClick={() => setMatchStarted(true)}
              className="match-btn"
              style={{
                visibility: !matchStarted && matchTime === 600 ? "visible" : "hidden",
              }}
            >
              {t.start}
            </button>

            <button
              onClick={resetGame}
              className="match-btn"
              style={{
                visibility: matchTime === 0 ? "visible" : "hidden",
              }}
            >
              {t.reset}
            </button>
          </div>

        </div>
      </div>

      {/* Main Layout: Player 1 | Shot Clock | Player 2 */}
      <div className="main-layout">

        {/* Player 1 Side */}
        <div className="player-side-horizontal">
          <div className="score-buttons">
            {["red", "yellow", "green", "brown", "blue", "pink", "black"].map((color) => (
              <button
                key={color}
                className={`ball-btn ball-${color}`}
                onClick={() => addPoints("player1", color)}
                title={color} // optional hover
              >
                <div className="ball-shape"></div>
              </button>
            ))}
          </div>

          <div className="player-info-inline">
            <button className="foul-btn" onClick={() => addPoints("player1", "foul")}>
              {t.foul} P1
            </button>
            <h3>{playerNames.player1}</h3>
            <div className="score">{t.playerScore}: {playerScores.player1}</div>
          </div>
        </div>

        {/* Center: Shot Clock Box */}
        <div className="center">
          <ShotClock time={shotClock} label={t.shotClock} />
          <div className="bottom-bar">
            {!isShotClockRunning ? (
              <button onClick={startShotClock} className="shot-btn">
                Start
              </button>
            ) : (
              <button onClick={stopShotClock} className="shot-btn">
                Stop
              </button>
            )}
          </div>
        </div>

        {/* Player 2 Side */}
        <div className="player-side-horizontal">
          <div className="player-info-inline">
            <button className="foul-btn" onClick={() => addPoints("player2", "foul")}>
              {t.foul} P2
            </button>
            <h3>{playerNames.player2}</h3>
            <div className="score">{t.playerScore}: {playerScores.player2}</div>
          </div>

          <div className="score-buttons">
            {["red", "yellow", "green", "brown", "blue", "pink", "black"].map((color) => (
              <button
                key={color + "2"}
                className={`ball-btn ball-${color}`}
                onClick={() => addPoints("player2", color)}
                title={color}
              >
                <div className="ball-shape"></div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );







}
