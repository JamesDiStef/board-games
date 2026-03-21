import { useEffect } from "react";
import GuessPanel from "./GuessPanel";
import { useSelector, useDispatch } from "react-redux";
import {
  openModal,
  setPlayer,
  setCurrentRoom,
  openResponseModal,
} from "./clueSlice";
import Report from "./Report";
import { fetchClueGame, createClueGame } from "./clueThunks";
import { AppDispatch } from "../store";

export const ClueBoard = () => {
  const playerName = useSelector((state: any) => state.user.userId);
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
    if (playerName !== "") {
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
  }, [playerName]);

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
    <div className="p-4 bg-white min-h-screen text-black">
      <div className="text-center text-2xl font-bold mb-4">Clue Game</div>
      <div className="relative">
        {isOpenResponseModal && (
          <div className="fixed inset-0 z-40 flex justify-center items-center bg-black/50">
            <div className="w-full max-w-3xl flex justify-center items-center">
              <Report />
            </div>
          </div>
        )}
        {isOpenModal && (
          <div className="fixed inset-0 z-30 flex justify-center items-center bg-black/50">
            <div className="w-full max-w-3xl flex justify-center items-center">
              <GuessPanel />
            </div>
          </div>
        )}
        <div className="relative z-10">
          <div className="grid grid-cols-4 gap-4">
            {board.map((room: any) => (
              <div
                key={room.id}
                className={`border-2 rounded-lg p-4 h-[180px] flex flex-col justify-center items-center cursor-pointer transition-transform transform hover:scale-105 ${
                  player.roomId === room.id
                    ? "bg-yellow-400 text-black"
                    : "bg-pink-300"
                }`}
                onClick={() => dispatch(setPlayer(room.id))}
              >
                <div className="text-xl font-semibold">{room.type}</div>
                {player.roomId === room.id && (
                  <div className="mt-2">{playerName}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClueBoard;
