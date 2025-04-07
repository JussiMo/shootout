import SnookerTimer from "./screens/SnookerTimer";

function App() {
  return (
    <div>
      <h1>Snooker App (Testing)</h1>
      <SnookerTimer
        language="EN"
        playerNames={{ player1: "Player 1", player2: "Player 2" }}
        setPlayerNames={() => {}}
        onOpenSettings={() => alert("Settings not implemented")}
      />
    </div>
  );
}

export default App;
