import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "./home/homeSlice";
import { logoutUser } from "./home/homeThunks";
import { resetGameState as resetTicTac } from "./tickTackToe/ticTacSlice";
import { resetGameState as resetHangman } from "./hangman/hangmanSlice";
import { resetGameState as resetConnectFour } from "./connectFour/connectFourSlice";
import { resetGameState as resetClue } from "./clue/clueSlice";
import { AppDispatch } from "./store";

interface Props {
  open: boolean;
  close: () => void;
  isFirstOpen: boolean;
}

const MobileNav = ({ open, close, isFirstOpen }: Props) => {
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    close();
    await dispatch(logoutUser());
    dispatch(clearAuth());
    dispatch(resetTicTac());
    dispatch(resetHangman());
    dispatch(resetConnectFour());
    dispatch(resetClue());
    navigate("/");
  };

  if (!open) return null;

  return (
    <ul className="flex flex-col sm:hidden bg-amber-500 h-screen text-4xl">
      {!isFirstOpen && (
        <li className="mx-auto mb-auto" onClick={() => close()}>
          Resume game
        </li>
      )}
      <li className="mx-auto mb-auto">
        <button onClick={() => close()}>
          <Link to="/home">Log In Page</Link>
        </button>
      </li>
      <li className="mx-auto mb-auto">
        <button onClick={() => close()}>
          <Link to="/hangman">Hangman</Link>
        </button>
      </li>
      <li className="mx-auto mb-auto">
        <button onClick={() => close()}>
          <Link to="/ticTacToe">Tic-Tac-Toe</Link>
        </button>
      </li>
      <li className="mx-auto mb-auto">
        <button onClick={() => close()}>
          <Link to="/connectFour">Connect Four</Link>
        </button>
      </li>
      <li className="mx-auto mb-auto">
        <button onClick={() => close()}>
          <Link to="/clue">Clue</Link>
        </button>
      </li>
      {isAuthenticated && (
        <li className="mx-auto mb-auto">
          <button onClick={handleLogout}>Logout</button>
        </li>
      )}
    </ul>
  );
};

export default MobileNav;
