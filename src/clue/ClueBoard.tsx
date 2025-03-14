import { useEffect, useState } from "react";
import GuessPanel from "./GuessPanel";
import ClueComingSoon from "./ClueComingSoon";

export const characters = [
  "Professor Plum",
  "Colonel Mustard",
  "Ms. Peacock",
  "Ms. Scarlett",
  "Mrs. White",
  "Mr. Green",
];

export const weapons = [
  "Candlestick",
  "Lead Pipe",
  "Revolver",
  "Wrench",
  "Rope",
  "Dagger",
];

export const ClueBoard = () => {
  const [isGameOver, setIsGameOver] = useState(false);
  const [eliminatedPeople, setEliminatedPeople] = useState<string[]>([]);
  const [eliminatedWeapons, setEliminatedWeapons] = useState<string[]>([]);
  const [eliminatedRooms, setEliminatedRooms] = useState<string[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [player, setPlayer] = useState({
    name: "james",
    roomId: 0,
  });
  const [currentRoom, setCurrentRoom] = useState("Study");
  const [board] = useState([
    { id: 0, type: "Study" },
    { id: 1, type: "Library" },
    { id: 2, type: "Dining Room" },
    { id: 3, type: "Kitchen" },
    { id: 4, type: "Pool Room" },
    { id: 5, type: "Bedroom" },
    { id: 6, type: "Walk in Closet" },
    { id: 7, type: "Hall" },
    { id: 8, type: "Billiards Room" },
    { id: 9, type: "Secret Lab" },
    { id: 10, type: "Storage Room" },
    { id: 11, type: "Ballroom" },
    { id: 12, type: "Bathroom" },
    { id: 13, type: "Conservatory" },
    { id: 14, type: "Lounge" },
    { id: 15, type: "Attic" },
  ]);

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
        setPlayer({ ...player, roomId: player.roomId + 4 });
        break;
      case 12:
        setPlayer({ ...player, roomId: 0 });
        break;
      case 13:
        setPlayer({ ...player, roomId: 1 });
        break;
      case 14:
        setPlayer({ ...player, roomId: 2 });
        break;
      case 15:
        setPlayer({ ...player, roomId: 3 });
        break;
      default:
        break;
    }
  };

  const arrowUpSwitch = () => {
    switch (player.roomId) {
      case 0:
        setPlayer({ ...player, roomId: 12 });
        break;
      case 1:
        setPlayer({ ...player, roomId: 13 });
        break;
      case 2:
        setPlayer({ ...player, roomId: 14 });
        break;
      case 3:
        setPlayer({ ...player, roomId: 15 });
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
        setPlayer({ ...player, roomId: player.roomId - 4 });
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
        setPlayer({ ...player, roomId: player.roomId + 1 });
        break;
      case 3:
        setPlayer({ ...player, roomId: 0 });
        break;
      case 4:
      case 5:
      case 6:
        setPlayer({ ...player, roomId: player.roomId + 1 });
        break;
      case 7:
        setPlayer({ ...player, roomId: 4 });
        break;
      case 8:
      case 9:
      case 10:
        setPlayer({ ...player, roomId: player.roomId + 1 });
        break;
      case 11:
        setPlayer({ ...player, roomId: 8 });
        break;
      case 12:
      case 13:
      case 14:
        setPlayer({ ...player, roomId: player.roomId + 1 });
        break;
      case 15:
        setPlayer({ ...player, roomId: 12 });
        break;
      default:
        break;
    }
  };

  const arrowLeftSwitch = () => {
    switch (player.roomId) {
      case 0:
        setPlayer({ ...player, roomId: 3 });
        break;
      case 1:
      case 2:
      case 3:
        setPlayer({ ...player, roomId: player.roomId - 1 });
        break;
      case 4:
        setPlayer({ ...player, roomId: 7 });
        break;
      case 5:
      case 6:
      case 7:
        setPlayer({ ...player, roomId: player.roomId - 1 });
        break;
      case 8:
        setPlayer({ ...player, roomId: 11 });
        break;
      case 9:
      case 10:
      case 11:
        setPlayer({ ...player, roomId: player.roomId - 1 });
        break;
      case 12:
        setPlayer({ ...player, roomId: 15 });
        break;
      case 13:
      case 14:
      case 15:
        setPlayer({ ...player, roomId: player.roomId - 1 });
        break;
      default:
        break;
    }
  };

  const openModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  const [confidential] = useState({
    murderer: characters[Math.floor(Math.random() * 6)],
    weapon: weapons[Math.floor(Math.random() * 6)],
    location: board[Math.floor(Math.random() * 16)].type,
  });

  useEffect(() => {
    setCurrentRoom(board.find((room) => room.id === player.roomId)!.type);
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
        openModal();
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
      {isOpenModal && (
        <GuessPanel
          room={currentRoom}
          confidential={confidential}
          isGameOver={isGameOver}
          setIsGameOver={setIsGameOver}
          eliminatedPeople={eliminatedPeople}
          setEliminatedPeople={setEliminatedPeople}
          eliminatedRooms={eliminatedRooms}
          setEliminatedRooms={setEliminatedRooms}
          eliminatedWeapons={eliminatedWeapons}
          setEliminatedWeapons={setEliminatedWeapons}
        />
      )}
      <div className="grid grid-cols-4 gap-2">
        {board.map((room) => (
          <div className="border-2 border-black bg-pink-300 h-[180px] w-full">
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
