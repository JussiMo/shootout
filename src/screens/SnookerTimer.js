import React, { useState, useEffect, useRef } from "react";
import ShotClock from "../components/ShotClock";
import MatchTimer from "../components/MatchTimer";
import "../styles/style.css";
import translations from "../utils/translations";
import FoulInputModal from "../components/FoulInputModal";


export default function SnookerTimer({ language, playerNames, setPlayerNames, onOpenSettings, settingsOpen, foulPoints }) {
  const [matchTime, setMatchTime] = useState(600);
  const [matchStarted, setMatchStarted] = useState(false);
  const [shotClock, setShotClock] = useState(15);
  const [playerScores, setPlayerScores] = useState({ player1: 0, player2: 0 });
  const [isShotClockRunning, setIsShotClockRunning] = useState(false);
  const [foulPlayer, setFoulPlayer] = useState(null);
  const [matchPaused, setMatchPaused] = useState(false);
  const t = translations[language];

const sounds = useRef({
  "5minEN": new Audio("audio/5minEN.mp3"),
  "5minFI": new Audio("audio/5minFI.mp3"),
  gameOverEN: new Audio("audio/gameOverEN.mp3"),
  gameOverFI: new Audio("audio/gameOverFI.mp3"),
  shortBeep: new Audio("audio/shortBeep.mp3"),
  longBeep: new Audio("audio/longBeep.mp3"),
});


  const pressTimer = useRef();


  useEffect(() => {
    Object.values(sounds.current).forEach((audio) => audio.load());
  }, []);

  useEffect(() => {
    let matchTimer;
    if (matchStarted && !matchPaused && matchTime > 0) {
      matchTimer = setInterval(() => {
        setMatchTime(prev => prev - 1);
      }, 1000);

      if (matchTime === 300) playSound(`5min${language}`);
    }
    return () => clearInterval(matchTimer);
  }, [matchStarted, matchPaused, matchTime, language]);


  useEffect(() => {
    if (matchTime === 0) {
      playSound(`gameOver${language}`);
    }
  }, [matchTime, language]);



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
          setIsShotClockRunning(false);
          setShotClock(matchTime > 300 ? 15 : 10);
        } else {
          if (shotClock <= 0) {
            setShotClock(matchTime > 300 ? 15 : 10);
          }
          setIsShotClockRunning(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isShotClockRunning, shotClock, matchTime, settingsOpen]);




  function addPoints(player, type, customValue, isUndo = false) {
    const ballPoints = {
      red: 1,
      yellow: 2,
      green: 3,
      brown: 4,
      blue: 5,
      pink: 6,
      black: 7,
      foul: customValue ?? foulPoints,
    };

    const points = ballPoints[type] || 0;
    const delta = isUndo ? -points : points;

    setPlayerScores((prev) => ({
      ...prev,
      [player]: Math.max(0, prev[player] + delta),
    }));

    if (!isUndo) {
      setShotClock(matchTime > 300 ? 15 : 10);
      setIsShotClockRunning(false);
    }
  }


  function handleFoul(player) {
    setFoulPlayer(player);
  }

  function handleFoulSubmit(points) {
    addPoints(foulPlayer, "foul", points);
    setFoulPlayer(null);
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
        </div>

        <div className="match-button-wrapper">
          {!matchStarted && matchTime === 600 && (
            <button onClick={() => setMatchStarted(true)} className="match-btn">
              {t.start}
            </button>
          )}

          {matchStarted && matchTime > 0 && (
            <button
              onClick={() => setMatchPaused((prev) => !prev)}
              className="match-btn"
            >
              {matchPaused ? t.resume : t.pause}
            </button>
          )}

          {matchTime === 0 && (
            <button onClick={resetGame} className="match-btn">
              {t.reset}
            </button>
          )}
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
                title={color}
                onMouseDown={() => {
                  pressTimer.current = setTimeout(() => {
                    addPoints("player1", color, undefined, true); // long press = undo
                    pressTimer.current = null;
                  }, 1000); // 1 second
                }}
                onMouseUp={() => {
                  if (pressTimer.current) {
                    clearTimeout(pressTimer.current);
                    addPoints("player1", color); // short press = add
                    pressTimer.current = null;
                  }
                }}
                onMouseLeave={() => {
                  if (pressTimer.current) {
                    clearTimeout(pressTimer.current);
                    pressTimer.current = null;
                  }
                }}
              >
                <div className="ball-shape"></div>
              </button>
            ))}

          </div>

          <div className="player-info-inline">
            <button className="foul-btn" onClick={() => handleFoul("player1")}>
              {t.foul} P1
            </button>
            <h3>{playerNames.player1}</h3>
            <div className="score">{playerScores.player1}</div>
          </div>
        </div>

        {/* Center: Shot Clock Box */}
        <div className="center">
          <ShotClock
            time={shotClock}
            label={{ text: t.shotClock, unit: t.shotUnit }}
            maxTime={matchTime > 300 ? 15 : 10}
          />
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
            <button className="foul-btn" onClick={() => handleFoul("player2")}>
              {t.foul} P2
            </button>
            <h3>{playerNames.player2}</h3>
            <div className="score">{playerScores.player2}</div>
          </div>

          <div className="score-buttons">
            {["red", "yellow", "green", "brown", "blue", "pink", "black"].map((color) => (
              <button
                key={color}
                className={`ball-btn ball-${color}`}
                title={color}
                onMouseDown={() => {
                  pressTimer.current = setTimeout(() => {
                    addPoints("player2", color, undefined, true); // long press = undo
                    pressTimer.current = null;
                  }, 1000); // 1 second
                }}
                onMouseUp={() => {
                  if (pressTimer.current) {
                    clearTimeout(pressTimer.current);
                    addPoints("player2", color); // short press = add
                    pressTimer.current = null;
                  }
                }}
                onMouseLeave={() => {
                  if (pressTimer.current) {
                    clearTimeout(pressTimer.current);
                    pressTimer.current = null;
                  }
                }}
              >
                <div className="ball-shape"></div>
              </button>
            ))}

          </div>
        </div>

        {/* Visual shotclock */}
        <div className="bottom-visual-shot-clock">
          {Array.from({ length: matchTime > 300 ? 15 : 10 }, (_, i) => {
            //const total = matchTime > 300 ? 15 : 10;
            const isFilled = i < shotClock;
            const isRed = shotClock <= 5 && i < 5;

            return (
              <div
                key={i}
                className={`shot-segment 
          ${isFilled ? "filled" : ""} 
          ${isRed && isFilled ? "danger" : ""}`}
              ></div>
            );
          })}
        </div>
      </div>

      {foulPlayer && (
        <FoulInputModal
          player={playerNames[foulPlayer]}
          onSubmit={handleFoulSubmit}
          onCancel={() => setFoulPlayer(null)}
          t={t}
        />

      )}

    </div>
  );
}
