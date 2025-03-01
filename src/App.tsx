import { Routes, Route } from "react-router-dom";
import HangmanBoard from "./hangman/HangmanBoard";
import Board from "./tickTackToe/TickTackToeBoard";
import ConnectFourBoard from "./connectFour/ConnectFourBoard";
import NavBar from "./NavBar";
import "./global.css";

function App() {
  return (
    <div>
      <NavBar />

      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/hangman" element={<HangmanBoard />} />
        <Route path="/ticTacToe" element={<Board />} />
        <Route path="/connectFour" element={<ConnectFourBoard />} />
      </Routes>
    </div>
  );
}

export default App;
