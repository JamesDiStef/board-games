import Report from "./Report";
import { useSelector, useDispatch } from "react-redux";
import {
  endGame,
  openResponseModal,
  setEliminatedPeople,
  setEliminatedRooms,
  setEliminatedWeapons,
  setPersonGuess,
  setRoomGuess,
  setThingToReveal,
  setWeaponGuess,
} from "./clueSlice";

const GuessPanel = () => {
  const saveGame = async (gameId: string, stuffToPatch: any) => {
    //should be called on every state update
    const url =
      "https://us-central1-xenon-heading-433720-j4.cloudfunctions.net/api/clue/" +
      gameId;
    const response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      //need to pass in the relevant field dynamically here
      body: JSON.stringify(stuffToPatch),
    });
    const game = await response.json();
  };

  const gameId = useSelector((state: any) => state.clue.gameId);
  const guesses = useSelector((state: any) => state.clue.guesses);
  const confidential = useSelector((state: any) => state.clue.confidential);
  const weapons = useSelector((state: any) => state.clue.weapons);
  const characters = useSelector((state: any) => state.clue.characters);
  const rooms = useSelector((state: any) => state.clue.board);
  const currentRoom = useSelector((state: any) => state.clue.currentRoom);
  const isOpenModal = useSelector(
    (state: any) => state.clue.isOpenResponseModal
  );
  const eliminatedPeople: string[] = useSelector(
    (state: any) => state.clue.eliminatedPeople
  );
  const eliminatedWeapons: string[] = useSelector(
    (state: any) => state.clue.eliminatedWeapons
  );
  const eliminatedRooms: string[] = useSelector(
    (state: any) => state.clue.eliminatedRooms
  );

  const dispatch = useDispatch();
  dispatch(setRoomGuess(currentRoom));

  const selectWeapon = (weapon: string) => {
    dispatch(setWeaponGuess(weapon));
  };

  const selectPerson = (person: string) => {
    dispatch(setPersonGuess(person));
  };

  const handleNewGame = () => {
    saveGame(gameId, { isGameOver: false });
    dispatch(endGame());
  };

  const handleEliminatePerson = () => {
    const newEliminatedPeople = [...eliminatedPeople, guesses.person];
    dispatch(setEliminatedPeople(newEliminatedPeople));
    saveGame(gameId, {
      eliminatedPeople: newEliminatedPeople,
    });
    dispatch(dispatch(setThingToReveal(guesses.person)));
  };

  const handleEliminateRoom = () => {
    const newEliminatedRooms = [...eliminatedRooms, guesses.room];
    dispatch(setEliminatedRooms(newEliminatedRooms));
    saveGame(gameId, {
      eliminatedRooms: newEliminatedRooms,
    });
    dispatch(setThingToReveal(guesses.room));
  };

  const handleEliminateWeapon = () => {
    const newEliminatedWeapons = [...eliminatedWeapons, guesses.weapon];
    dispatch(setEliminatedWeapons(newEliminatedWeapons));
    saveGame(gameId, {
      eliminatedWeapon: newEliminatedWeapons,
    });
  };

  const onGuess = () => {
    if (
      guesses.person === confidential.person &&
      guesses.weapon === confidential.weapon &&
      guesses.room === confidential.room
    ) {
      handleNewGame();
      dispatch(openResponseModal());
    } else {
      const revealIndex = Math.floor(Math.random() * 3);
      switch (revealIndex) {
        case 0:
          if (confidential.person !== guesses.person) {
            handleEliminatePerson();
          } else if (confidential.room !== guesses.room) {
            handleEliminateRoom();
          } else if (confidential.weapon !== guesses.weapon) {
            handleEliminateWeapon();
          } else alert("I've got nothing to tell you");

          break;
        case 1:
          if (confidential.room !== guesses.room) {
            handleEliminateRoom();
          } else if (confidential.weapon !== guesses.weapon) {
            handleEliminateWeapon();
          } else if (confidential.person !== guesses.person) {
            handleEliminatePerson();
          } else alert("I've got nothing to tell you");
          break;
        case 2:
          if (confidential.person !== guesses.person) {
            handleEliminatePerson();
          } else if (confidential.weapon !== guesses.weapon) {
            handleEliminateWeapon();
          } else if (confidential.room !== guesses.room) {
            handleEliminateRoom();
          } else alert("I've got nothing to tell you");
          break;
      }
      dispatch(openResponseModal());
    }

    // dispatch(openModal());
  };

  return (
    <div className="flex flex-col ml-[10%] mt-[3%] fixed h-[80%] w-[80%] bg-amber-700">
      {isOpenModal && <Report />}
      <div className="h-3/4 flex ">
        <div className="w-1/4 flex flex-col">
          <div className="text-2xl m-3">Suspects</div>
          {characters.map((char: string) => (
            <div key={char} className="mr-5 mt-2">
              {eliminatedPeople.includes(char) && (
                <div className="line-through">{char}</div>
              )}
              {!eliminatedPeople.includes(char) && (
                <div className="flex">
                  <input
                    type="checkbox"
                    checked={guesses.person === char}
                    onChange={() => selectPerson(char)}
                  />
                  <div className="mr-5">{char}</div>{" "}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="w-1/4 flex flex-col">
          <div className="text-2xl m-3">Weapons</div>

          {weapons.map((weapon: string) => (
            <div key={weapon} className="mr-5 mt-2">
              {eliminatedWeapons.includes(weapon) && (
                <div className="line-through">{weapon}</div>
              )}
              {!eliminatedWeapons.includes(weapon) && (
                <div className="flex">
                  <input
                    type="checkbox"
                    checked={guesses.weapon === weapon}
                    onChange={() => selectWeapon(weapon)}
                  />
                  <div className="mr-5">{weapon}</div>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="h-3/5 w-1/2 flex flex-col flex-wrap">
          <div className="text-2xl self-center ">Rooms</div>

          {rooms.map((room: any) => (
            <div key={room.id} className="mr-5 mt-2">
              {eliminatedRooms.includes(room.type) && (
                <div className="line-through">{room.type}</div>
              )}
              {!eliminatedRooms.includes(room.type) && (
                <div className="flex">
                  <input
                    type="checkbox"
                    readOnly
                    checked={room.type === currentRoom}
                  />
                  <div className="mr-5">{room.type}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4 text-center">
        {guesses.person === "" && guesses.weapon === "" && (
          <div>Please choose a person and weapon</div>
        )}
        {guesses.person === "" && guesses.weapon !== "" && (
          <div>Please choose a person</div>
        )}
        {guesses.person !== "" && guesses.weapon === "" && (
          <div>Please choose a weapon</div>
        )}
        {guesses.person !== "" && guesses.weapon !== "" && (
          <div className="text-lg font-semibold">
            I accuse {guesses.person} in the {guesses.room} with the{" "}
            {guesses.weapon}
          </div>
        )}
        <button
          disabled={guesses.person === "" || guesses.weapon === ""}
          onClick={onGuess}
          className="rounded border-2 bg-yellow-100 w-1/2 cursor-pointer disabled:bg-red-500"
        >
          Guess
        </button>
      </div>
    </div>
  );
};

export default GuessPanel;
