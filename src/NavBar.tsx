import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button
        className="flex p-3 sm:hidden text-3xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <nav>
        <ul className="hidden sm:flex mr-6 py-3 bg-amber-500 w-full">
          <li className="mr-6">
            <Link to="/ticTacToe">Home</Link>
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
        </ul>

        {isOpen && (
          <ul className="block sm:hidden bg-amber-500">
            <li className="ml-3">
              <Link to="/ticTacToe">Home</Link>
            </li>
            <li className="ml-3">
              <Link to="/hangman">Hangman</Link>
            </li>
            <li className="ml-3">
              <Link to="/ticTacToe">Tic-Tac-Toe</Link>
            </li>
            <li className="ml-3">
              <Link to="/connectFour">Connect Four</Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default NavBar;
