import { Routes, Route, useLocation } from "react-router-dom";
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
import Home from "./home/Home";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/home" || location.pathname === "/";
  const [openModal, setOpenModal] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const close = () => {
    setOpenModal(false);
    setIsFirstOpen(false);
  };
  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col">
      <div className="block sm:hidden bg-amber-600 flex-shrink-0">
        <button
          className="flex p-3 sm:hidden text-3xl text-white"
          onClick={() => setOpenModal(!openModal)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <MobileNav
          open={openModal}
          close={() => close()}
          isFirstOpen={isFirstOpen}
        />
      </div>
      {!isHome && (
        <div className="hidden sm:block flex-shrink-0">
          <NavBar />
        </div>
      )}

      <div className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/hangman" element={<HangmanBoard />} />
          <Route path="/ticTacToe" element={<Board />} />
          <Route path="/connectFour" element={<ConnectFourBoard />} />
          <Route path="/clue" element={<ClueBoard />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
