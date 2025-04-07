import React, { useState, useEffect, useRef } from "react";
import ShotClock from "../components/ShotClock";
import MatchTimer from "../components/MatchTimer";
import Scoreboard from "../components/Scoreboard";
import ControlPanel from "../components/ControlPanel";
import "../styles/style.css";

export default function SnookerTimer({ language, playerNames, setPlayerNames, onOpenSettings }) {
  const [matchTime, setMatchTime] = useState(600);
  const [matchStarted, setMatchStarted] = useState(false);
  const [shotClock, setShotClock] = useState(15);
  const [playerScores, setPlayerScores] = useState({ player1: 0, player2: 0 });
  const [isShotClockRunning, setIsShotClockRunning] = useState(false);

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
      <h1 className="title">Snooker Shoot-Out Timer</h1>
      <button onClick={onOpenSettings}>Settings</button>
      {!matchStarted && matchTime === 600 && (
        <button onClick={() => setMatchStarted(true)}>Start Match</button>
      )}
      {matchTime === 0 && <button onClick={resetGame}>Reset Match</button>}
      <MatchTimer time={matchTime} />
      <ShotClock time={shotClock} />
      <ControlPanel
        onStart={startShotClock}
        onStop={stopShotClock}
        isRunning={isShotClockRunning}
        onScore={(player, type) => addPoints(player, type)}
        playerNames={playerNames}
      />
      <Scoreboard scores={playerScores} playerNames={playerNames} />
    </div>
  );
}
