import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <button
        className="flex p-3 sm:hidden text-3xl text-white bg-amber-600 w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>
      <nav className="w-full">
        <ul className="hidden sm:flex bg-gradient-to-r from-amber-500 to-amber-600 w-full shadow-lg h-full items-center">
          <li className="ml-3 mr-6 text-sm">
            <Link to="/home" className="block py-3 font-semibold text-gray-800 hover:text-white transition-colors duration-200 whitespace-nowrap">Home</Link>
          </li>
          <li className="mr-6 text-sm">
            <Link to="/hangman" className="block py-3 font-semibold text-gray-800 hover:text-white transition-colors duration-200 whitespace-nowrap">Hangman</Link>
          </li>
          <li className="mr-6 text-sm">
            <Link to="/ticTacToe" className="block py-3 font-semibold text-gray-800 hover:text-white transition-colors duration-200 whitespace-nowrap">Tic-Tac-Toe</Link>
          </li>
          <li className="mr-6 text-sm">
            <Link to="/connectFour" className="block py-3 font-semibold text-gray-800 hover:text-white transition-colors duration-200 whitespace-nowrap">Connect Four</Link>
          </li>
          <li className="mr-6 text-sm">
            <Link to="/clue" className="block py-3 font-semibold text-gray-800 hover:text-white transition-colors duration-200 whitespace-nowrap">Clue</Link>
          </li>
        </ul>

        {isOpen && (
          <ul className="block sm:hidden bg-amber-600 space-y-2 p-3">
            <li>
              <Link to="/home" className="block py-2 px-3 font-semibold text-white hover:bg-amber-700 rounded transition-colors duration-200">Home</Link>
            </li>
            <li>
              <Link to="/hangman" className="block py-2 px-3 font-semibold text-white hover:bg-amber-700 rounded transition-colors duration-200">Hangman</Link>
            </li>
            <li>
              <Link to="/ticTacToe" className="block py-2 px-3 font-semibold text-white hover:bg-amber-700 rounded transition-colors duration-200">Tic-Tac-Toe</Link>
            </li>
            <li>
              <Link to="/connectFour" className="block py-2 px-3 font-semibold text-white hover:bg-amber-700 rounded transition-colors duration-200">Connect Four</Link>
            </li>
            <li>
              <Link to="/clue" className="block py-2 px-3 font-semibold text-white hover:bg-amber-700 rounded transition-colors duration-200">Clue</Link>
            </li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default NavBar;
