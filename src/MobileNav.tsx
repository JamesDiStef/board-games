import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  close: () => void;
  isFirstOpen: boolean;
}

const MobileNav = ({ open, close, isFirstOpen }: Props) => {
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
    </ul>
  );
};

export default MobileNav;
