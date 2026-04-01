import { useEffect } from "react";
import GuessPanel from "./GuessPanel";
import { useSelector, useDispatch } from "react-redux";
import {
  openModal,
  setPlayer,
  setCurrentRoom,
  openResponseModal,
  resetGameState,
} from "./clueSlice";
import Report from "./Report";
import { fetchClueGame, createClueGame } from "./clueThunks";
import { AppDispatch } from "../store";

export const ClueBoard = () => {
  const playerName = useSelector((state: any) => state.user.userId);
  const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
  const clueGame = useSelector((state: any) => state.clue);
  // const gameId = useSelector((state: any) => state.clue.gameId);
  const isOpenModal = useSelector((state: any) => state.clue.isOpenModal);
  const isOpenResponseModal = useSelector(
    (state: any) => state.clue.isOpenResponseModal
  );
  const player = useSelector((state: any) => state.clue.player);
  const dispatch = useDispatch<AppDispatch>();
  const board = useSelector((state: any) => state.clue.board);

  const arrowDownSwitch = () => {
    switch (player.roomId) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
        dispatch(setPlayer(player.roomId + 4));
        break;
      case 12:
        dispatch(setPlayer(0));
        break;
      case 13:
        dispatch(setPlayer(1));
        break;
      case 14:
        dispatch(setPlayer(2));
        break;
      case 15:
        dispatch(setPlayer(3));
        break;
      default:
        break;
    }
  };

  const arrowUpSwitch = () => {
    switch (player.roomId) {
      case 0:
        dispatch(setPlayer(12));
        break;
      case 1:
        dispatch(setPlayer(13));
        break;
      case 2:
        dispatch(setPlayer(14));
        break;
      case 3:
        dispatch(setPlayer(15));
        break;
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
      case 12:
      case 13:
      case 14:
      case 15:
        dispatch(setPlayer(player.roomId - 4));
        break;
      default:
        break;
    }
  };

  const arrowRightSwitch = () => {
    switch (player.roomId) {
      case 0:
      case 1:
      case 2:
        dispatch(setPlayer(player.roomId + 1));
        break;
      case 3:
        dispatch(setPlayer(0));
        break;
      case 4:
      case 5:
      case 6:
        dispatch(setPlayer(player.roomId + 1));
        break;
      case 7:
        dispatch(setPlayer(4));
        break;
      case 8:
      case 9:
      case 10:
        dispatch(setPlayer(player.roomId + 1));
        break;
      case 11:
        dispatch(setPlayer(8));
        break;
      case 12:
      case 13:
      case 14:
        dispatch(setPlayer(player.roomId + 1));
        break;
      case 15:
        dispatch(setPlayer(12));
        break;
      default:
        break;
    }
  };

  const arrowLeftSwitch = () => {
    switch (player.roomId) {
      case 0:
        dispatch(setPlayer(3));
        break;
      case 1:
      case 2:
      case 3:
        dispatch(setPlayer(player.roomId - 1));
        break;
      case 4:
        dispatch(setPlayer(7));
        break;
      case 5:
      case 6:
      case 7:
        dispatch(setPlayer(player.roomId - 1));
        break;
      case 8:
        dispatch(setPlayer(11));
        break;
      case 9:
      case 10:
      case 11:
        dispatch(setPlayer(player.roomId - 1));
        break;
      case 12:
        dispatch(setPlayer(15));
        break;
      case 13:
      case 14:
      case 15:
        dispatch(setPlayer(player.roomId - 1));
        break;
      default:
        break;
    }
  };

  const handleModal = () => {
    dispatch(openModal());
  };

  useEffect(() => {
    dispatch(resetGameState());
    if (isAuthenticated) {
      dispatch(fetchClueGame(playerName)).then((result) => {
        if (fetchClueGame.fulfilled.match(result)) {
          if (
            result.payload &&
            Array.isArray(result.payload) &&
            result.payload.length === 0
          ) {
            dispatch(createClueGame({ playerName, gameData: { clueGame } }));
          }
        }
      });
    }
  }, [playerName, isAuthenticated, dispatch]);

  useEffect(() => {
    dispatch(
      setCurrentRoom(board.find((room: any) => room.id === player.roomId)!.type)
    );
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        arrowDownSwitch();
      } else if (e.key === "ArrowUp") {
        arrowUpSwitch();
      } else if (e.key === "ArrowRight") {
        arrowRightSwitch();
      } else if (e.key === "ArrowLeft") {
        arrowLeftSwitch();
      } else if (e.key === "Enter") {
        if (isOpenResponseModal) dispatch(openResponseModal());
        handleModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="min-h-screen bg-green-950 p-4 text-black">
      {/* Title */}
      <div className="text-center mb-6">
        <h1
          className="text-5xl font-bold text-yellow-400 tracking-[0.3em] uppercase"
          style={{ fontFamily: "Georgia, serif", textShadow: "2px 2px 6px rgba(0,0,0,0.8)" }}
        >
          CLUE
        </h1>
        <p className="text-yellow-200 text-xs tracking-widest mt-1 uppercase">
          The Mystery Game
        </p>
      </div>

      <div className="relative">
        {isOpenResponseModal && (
          <div className="fixed inset-0 z-40 flex justify-center items-center bg-black/70">
            <div className="w-full max-w-3xl flex justify-center items-center px-4">
              <Report />
            </div>
          </div>
        )}
        {isOpenModal && (
          <div className="fixed inset-0 z-30 flex justify-center items-center bg-black/70">
            <div className="w-full max-w-4xl flex justify-center items-center px-4">
              <GuessPanel />
            </div>
          </div>
        )}

        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Game board */}
          <div className="border-8 border-amber-800 p-3 bg-green-900 shadow-2xl">
            <div className="grid grid-cols-4 gap-2">
              {board.map((room: any) => (
                <div
                  key={room.id}
                  className={`border-2 p-3 h-[150px] flex flex-col justify-center items-center cursor-pointer transition-all duration-200 ${
                    player.roomId === room.id
                      ? "bg-yellow-400 border-yellow-600 shadow-lg scale-105"
                      : "bg-amber-50 border-amber-800 hover:bg-amber-100 hover:shadow-md"
                  }`}
                  onClick={() => dispatch(setPlayer(room.id))}
                >
                  <div
                    className="text-sm font-bold text-center text-amber-900 uppercase tracking-wide"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    {room.type}
                  </div>
                  {player.roomId === room.id && (
                    <div className="mt-2 text-xs font-semibold text-amber-900 bg-white/60 px-2 py-1 rounded-full">
                      {playerName}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Make Accusation button */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleModal}
              className="bg-red-900 hover:bg-red-800 text-yellow-200 font-bold py-3 px-12 border-2 border-yellow-600 uppercase tracking-widest transition-colors shadow-lg cursor-pointer"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Make Accusation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClueBoard;
