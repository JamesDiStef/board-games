import { useEffect } from "react";
import GuessPanel from "./GuessPanel";
import ClueComingSoon from "./ClueComingSoon";
import { useSelector, useDispatch } from "react-redux";
import {
  openModal,
  setPlayer,
  setCurrentRoom,
  openResponseModal,
} from "./clueSlice";

export const ClueBoard = () => {
  const isOpenModal = useSelector((state: any) => state.clue.isOpenModal);
  const isOpenResponseModal = useSelector(
    (state: any) => state.clue.isOpenResponseModal
  );
  const player = useSelector((state: any) => state.clue.player);
  const dispatch = useDispatch();
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

  const confidential = useSelector((state: any) => state.clue.confidential);

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
    <div>
      <ClueComingSoon />
      {isOpenModal && <GuessPanel />}
      <div className="grid grid-cols-4 gap-2">
        {board.map((room: any) => (
          <div
            key={room.id}
            className="border-2 border-black bg-pink-300 h-[180px] w-full"
          >
            {player.roomId === room.id && <div>{player.name}</div>}
            <div className="flex justify-center items-center text-3xl">
              {room.type}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClueBoard;
