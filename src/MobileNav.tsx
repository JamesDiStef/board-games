import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  close: () => void;
  isFirstOpen: boolean;
}

const MobileNav = ({ open, close, isFirstOpen }: Props) => {
  if (!open) return null;
  return (
    <ul className="flex flex-col sm:hidden bg-gradient-to-b from-amber-500 to-amber-600 h-screen text-xl font-bold space-y-2 p-4">
      {!isFirstOpen && (
        <li className="text-white hover:text-gray-800 transition-colors duration-200 py-3 px-4">
          <button onClick={() => close()} className="w-full text-left">
            📱 Resume Game
          </button>
        </li>
      )}
      <li className="text-white hover:bg-amber-700 transition-colors duration-200 rounded py-3 px-4">
        <button onClick={() => close()} className="w-full text-left">
          <Link to="/home">🏠 Home</Link>
        </button>
      </li>
      <li className="text-white hover:bg-amber-700 transition-colors duration-200 rounded py-3 px-4">
        <button onClick={() => close()} className="w-full text-left">
          <Link to="/hangman">🎮 Hangman</Link>
        </button>
      </li>
      <li className="text-white hover:bg-amber-700 transition-colors duration-200 rounded py-3 px-4">
        <button onClick={() => close()} className="w-full text-left">
          <Link to="/ticTacToe">⭕ Tic-Tac-Toe</Link>
        </button>
      </li>
      <li className="text-white hover:bg-amber-700 transition-colors duration-200 rounded py-3 px-4">
        <button onClick={() => close()} className="w-full text-left">
          <Link to="/connectFour">🔴 Connect Four</Link>
        </button>
      </li>
      <li className="text-white hover:bg-amber-700 transition-colors duration-200 rounded py-3 px-4">
        <button onClick={() => close()} className="w-full text-left">
          <Link to="/clue">🔍 Clue</Link>
        </button>
      </li>
    </ul>
  );
};

export default MobileNav;
