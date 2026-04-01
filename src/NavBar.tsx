import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearAuth } from "./home/homeSlice";
import { logoutUser } from "./home/homeThunks";
import { resetGameState as resetTicTac } from "./tickTackToe/ticTacSlice";
import { resetGameState as resetHangman } from "./hangman/hangmanSlice";
import { resetGameState as resetConnectFour } from "./connectFour/connectFourSlice";
import { resetGameState as resetClue } from "./clue/clueSlice";
import { AppDispatch } from "./store";

const NavBar = () => {
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logoutUser());
    dispatch(clearAuth());
    dispatch(resetTicTac());
    dispatch(resetHangman());
    dispatch(resetConnectFour());
    dispatch(resetClue());
    navigate("/");
  };

  return (
    <nav>
      <ul className="hidden sm:flex mr-6 py-3 bg-amber-500 w-full items-center">
        <li className="ml-3 mr-6">
          <Link to="/home">Home</Link>
        </li>
        <li className="mr-6">
          <Link to="/hangman">Hangman</Link>
        </li>
        <li className="mr-6">
          <Link to="/ticTacToe">Tic-Tac-Toe</Link>
        </li>
        <li className="mr-6">
          <Link to="/connectFour">Connect Four</Link>
        </li>
        <li className="mr-6">
          <Link to="/clue">Clue</Link>
        </li>
        {isAuthenticated && (
          <li className="ml-auto mr-4">
            <button
              onClick={handleLogout}
              className="text-black font-semibold underline"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
