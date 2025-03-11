import { Routes, Route } from "react-router-dom";
import HangmanBoard from "./hangman/HangmanBoard";
import Board from "./tickTackToe/TickTackToeBoard";
import ConnectFourBoard from "./connectFour/ConnectFourBoard";
import NavBar from "./NavBar";
import "./global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import MobileNav from "./MobileNav";
import { useState } from "react";
import ClueBoard from "./clue/ClueBoard";
import ClueComingSoon from "./clue/ClueComingSoon";

function App() {
  const [openModal, setOpenModal] = useState(true);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const close = () => {
    setOpenModal(false);
    setIsFirstOpen(false);
  };
  return (
    <div>
      <div className="block sm:hidden bg-amber-500">
        <button
          className="flex p-3 sm:hidden text-3xl "
          onClick={() => setOpenModal(true)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <MobileNav
          open={openModal}
          close={() => close()}
          isFirstOpen={isFirstOpen}
        />
      </div>
      <div className="hidden sm:block">
        <NavBar />
      </div>
      <Routes>
        <Route path="/" element={<Board />} />
        <Route path="/hangman" element={<HangmanBoard />} />
        <Route path="/ticTacToe" element={<Board />} />
        <Route path="/connectFour" element={<ConnectFourBoard />} />
        <Route path="/clue" element={<ClueComingSoon />} />
      </Routes>
    </div>
  );
}

export default App;
