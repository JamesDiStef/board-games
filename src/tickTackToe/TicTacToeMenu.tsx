import { useNavigate } from "react-router-dom";

const TicTacToeMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-sm w-full flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-2 text-blue-600">
          Tic Tac Toe
        </h1>
        <p className="text-gray-500 text-sm mb-8 text-center">Choose a game mode</p>

        <button
          onClick={() => navigate("/tic-tac-toe/pass-and-play")}
          className="h-12 w-full rounded-md bg-amber-500 text-black font-semibold mb-4 cursor-pointer hover:bg-amber-600 transition-colors"
        >
          Pass and Play
        </button>

        <button
          disabled
          className="h-12 w-full rounded-md bg-amber-500 text-black font-semibold mb-4 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Single Player
        </button>

        <button
          disabled
          className="h-12 w-full rounded-md bg-amber-500 text-black font-semibold disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Multiplayer
        </button>
      </div>
    </div>
  );
};

export default TicTacToeMenu;
