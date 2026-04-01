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
import { saveClueGameState } from "./clueThunks";
import { AppDispatch } from "../store";

const GuessPanel = () => {
  const playerName = useSelector((state: any) => state.user.userId);
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

  const dispatch = useDispatch<AppDispatch>();
  dispatch(setRoomGuess(currentRoom));

  const selectWeapon = (weapon: string) => {
    dispatch(setWeaponGuess(weapon));
  };

  const selectPerson = (person: string) => {
    dispatch(setPersonGuess(person));
  };

  const handleNewGame = () => {
    dispatch(saveClueGameState({ playerName, stuffToPatch: { isGameOver: false } }));
    dispatch(endGame());
  };

  const handleEliminatePerson = () => {
    const newEliminatedPeople = [...eliminatedPeople, guesses.person];
    dispatch(setEliminatedPeople(newEliminatedPeople));
    dispatch(
      saveClueGameState({
        playerName,
        stuffToPatch: {
          eliminatedPeople: newEliminatedPeople,
        },
      })
    );
    dispatch(setThingToReveal(guesses.person));
  };

  const handleEliminateRoom = () => {
    const newEliminatedRooms = [...eliminatedRooms, guesses.room];
    dispatch(setEliminatedRooms(newEliminatedRooms));
    dispatch(
      saveClueGameState({
        playerName,
        stuffToPatch: {
          eliminatedRooms: newEliminatedRooms,
        },
      })
    );
    dispatch(setThingToReveal(guesses.room));
  };

  const handleEliminateWeapon = () => {
    const newEliminatedWeapons = [...eliminatedWeapons, guesses.weapon];
    dispatch(setEliminatedWeapons(newEliminatedWeapons));
    dispatch(
      saveClueGameState({
        playerName,
        stuffToPatch: {
          eliminatedWeapons: newEliminatedWeapons,
        },
      })
    );
    dispatch(setThingToReveal(guesses.weapon));
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
    <div className="flex flex-col w-full bg-[#f5f0e0] border-4 border-amber-800 shadow-2xl overflow-hidden">
      {isOpenModal && <Report />}
      {/* Header */}
      <div className="bg-red-900 py-3 px-6 flex items-center justify-between flex-shrink-0">
        <h2
          className="text-yellow-200 text-xl font-bold tracking-widest uppercase"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Detective's Notebook
        </h2>
        <div className="text-yellow-300 text-sm italic">Current Room: {currentRoom}</div>
      </div>

      {/* Columns */}
      <div className="flex overflow-hidden" style={{ minHeight: "380px" }}>
        {/* Suspects */}
        <div className="w-1/4 flex flex-col p-4 border-r border-amber-300">
          <div
            className="text-base font-bold text-amber-900 mb-3 uppercase tracking-wide pb-2 border-b-2 border-amber-500"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Suspects
          </div>
          {characters.map((char: string) => (
            <div key={char} className="mb-2">
              {eliminatedPeople.includes(char) ? (
                <div className="line-through text-gray-400 text-sm">{char}</div>
              ) : (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={guesses.person === char}
                    onChange={() => selectPerson(char)}
                    className="cursor-pointer accent-red-800"
                  />
                  <span
                    className={`text-sm text-amber-900 ${guesses.person === char ? "font-bold" : ""}`}
                  >
                    {char}
                  </span>
                </label>
              )}
            </div>
          ))}
        </div>

        {/* Weapons */}
        <div className="w-1/4 flex flex-col p-4 border-r border-amber-300">
          <div
            className="text-base font-bold text-amber-900 mb-3 uppercase tracking-wide pb-2 border-b-2 border-amber-500"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Weapons
          </div>
          {weapons.map((weapon: string) => (
            <div key={weapon} className="mb-2">
              {eliminatedWeapons.includes(weapon) ? (
                <div className="line-through text-gray-400 text-sm">{weapon}</div>
              ) : (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={guesses.weapon === weapon}
                    onChange={() => selectWeapon(weapon)}
                    className="cursor-pointer accent-red-800"
                  />
                  <span
                    className={`text-sm text-amber-900 ${guesses.weapon === weapon ? "font-bold" : ""}`}
                  >
                    {weapon}
                  </span>
                </label>
              )}
            </div>
          ))}
        </div>

        {/* Rooms */}
        <div className="w-1/2 flex flex-col p-4">
          <div
            className="text-base font-bold text-amber-900 mb-3 uppercase tracking-wide pb-2 border-b-2 border-amber-500"
            style={{ fontFamily: "Georgia, serif" }}
          >
            Rooms
          </div>
          <div className="flex flex-wrap gap-x-4">
            {rooms.map((room: any) => (
              <div key={room.id} className="mb-2 w-[45%]">
                {eliminatedRooms.includes(room.type) ? (
                  <div className="line-through text-gray-400 text-sm">{room.type}</div>
                ) : (
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      readOnly
                      checked={room.type === currentRoom}
                      className="cursor-default accent-red-800"
                    />
                    <span
                      className={`text-sm text-amber-900 ${room.type === currentRoom ? "font-bold" : ""}`}
                    >
                      {room.type}
                    </span>
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accusation footer */}
      <div className="bg-amber-100 border-t-2 border-amber-400 p-4 flex flex-col items-center gap-3 flex-shrink-0">
        {guesses.person === "" && guesses.weapon === "" && (
          <div className="text-amber-800 italic text-sm">
            Choose a suspect and weapon to make your accusation
          </div>
        )}
        {guesses.person === "" && guesses.weapon !== "" && (
          <div className="text-amber-800 italic text-sm">Choose a suspect</div>
        )}
        {guesses.person !== "" && guesses.weapon === "" && (
          <div className="text-amber-800 italic text-sm">Choose a weapon</div>
        )}
        {guesses.person !== "" && guesses.weapon !== "" && (
          <div
            className="text-lg font-bold text-red-900 text-center"
            style={{ fontFamily: "Georgia, serif" }}
          >
            I accuse {guesses.person} in the {guesses.room} with the {guesses.weapon}!
          </div>
        )}
        <button
          disabled={guesses.person === "" || guesses.weapon === ""}
          onClick={onGuess}
          className="bg-red-900 hover:bg-red-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-yellow-200 font-bold py-2 px-12 border-2 border-yellow-600 uppercase tracking-widest transition-colors cursor-pointer"
          style={{ fontFamily: "Georgia, serif" }}
        >
          Accuse!
        </button>
      </div>
    </div>
  );
};

export default GuessPanel;
