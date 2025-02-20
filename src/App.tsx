import { Link, Routes, Route } from "react-router-dom";
import HangmanBoard from "./hangman/HangmanBoard";
import Board from "./tickTackToe/TickTackToeBoard";
import ConnectFourBoard from "./connectFour/ConnectFourBoard";

function App() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/hangman">Hangman</Link>
          </li>
          <li>
            <Link to="/tickTackToe">Tick Tack Toe</Link>
          </li>
          <li>
            <Link to="/connectFour">Connect Four</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<HangmanBoard />} />
        <Route path="/hangman" element={<HangmanBoard />} />
        <Route path="/tickTackToe" element={<Board />} />
        <Route path="/connectFour" element={<ConnectFourBoard />} />
      </Routes>
    </div>
  );
}

export default App;
