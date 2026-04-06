import { Routes, Route, useLocation } from "react-router-dom";
import HangmanBoard from "./hangman/HangmanBoard";
import Board from "./tickTackToe/TickTackToeBoard";
import TicTacToeMenu from "./tickTackToe/TicTacToeMenu";
import ConnectFourBoard from "./connectFour/ConnectFourBoard";
import ConnectFourMenu from "./connectFour/ConnectFourMenu";
import NavBar from "./NavBar";
import "./global.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import MobileNav from "./MobileNav";
import { useEffect, useState } from "react";
import ClueBoard from "./clue/ClueBoard";
import Home from "./home/Home";
import Register from "./home/Register";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { fetchMe } from "./home/homeThunks";

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/home" || location.pathname === "/";
  const [openModal, setOpenModal] = useState(false);
  const [isFirstOpen, setIsFirstOpen] = useState(true);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  const close = () => {
    setOpenModal(false);
    setIsFirstOpen(false);
  };

  return (
    <div>
      <div className="block sm:hidden bg-amber-500">
        <button
          className="flex p-3 sm:hidden text-3xl"
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
        <div className="hidden sm:block">
          <NavBar />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/hangman" element={<HangmanBoard />} />
        <Route path="/ticTacToe" element={<TicTacToeMenu />} />
        <Route path="/tic-tac-toe/pass-and-play" element={<Board mode="pass-and-play" />} />
        <Route path="/tic-tac-toe/single-player" element={<Board mode="single-player" />} />
        <Route path="/tic-tac-toe/multiplayer" element={<Board mode="multiplayer" />} />
        <Route path="/connectFour" element={<ConnectFourMenu />} />
        <Route path="/connect-four/pass-and-play" element={<ConnectFourBoard mode="pass-and-play" />} />
        <Route path="/connect-four/single-player" element={<ConnectFourBoard mode="single-player" />} />
        <Route path="/connect-four/multiplayer" element={<ConnectFourBoard mode="multiplayer" />} />
        <Route path="/clue" element={<ClueBoard />} />
      </Routes>
    </div>
  );
}

export default App;
