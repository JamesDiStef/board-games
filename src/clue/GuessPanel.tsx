import Report from "./Report";
import { useSelector, useDispatch } from "react-redux";
import {
  endGame,
  openModal,
  openResponseModal,
  setEliminatedPeople,
  setEliminatedRooms,
  setEliminatedWeapons,
  setPersonGuess,
  setThingToReveal,
  setWeaponGuess,
} from "./clueSlice";

const rooms = [
  "Study",
  "Library",
  "Dining Room",
  "Kitchen",
  "Pool Room",
  "Bedroom",
  "Walk in Closet",
  "Hall",
  "Billiards Room",
  "Secret Lab",
  "Storage Room",
  "Ballroom",
  "Bathroom",
  "Conservatory",
  "Lounge",
  "Attic",
];

const GuessPanel = () => {
  const guesses = useSelector((state: any) => state.clue.guesses);
  const confidential = useSelector((state: any) => state.clue.confidential);
  const weapons = useSelector((state: any) => state.clue.weapons);
  const characters = useSelector((state: any) => state.clue.characters);
  const currentRoom = useSelector((state: any) => state.clue.currentRoom);
  const isOpenModal = useSelector(
    (state: any) => state.clue.isOpenResponseModal
  );
  const eliminatedPeople = useSelector(
    (state: any) => state.clue.eliminatedPeople
  );
  const eliminatedWeapons = useSelector(
    (state: any) => state.clue.eliminatedWeapons
  );
  const eliminatedRooms = useSelector(
    (state: any) => state.clue.eliminatedRooms
  );

  const dispatch = useDispatch();

  const selectWeapon = (weapon: string) => {
    dispatch(setWeaponGuess(weapon));
  };

  const selectPerson = (person: string) => {
    dispatch(setPersonGuess(person));
  };

  const handleNewGame = () => {
    dispatch(endGame());
  };

  const onGuess = () => {
    if (
      guesses.person === confidential.murderer &&
      guesses.weapon === confidential.weapon &&
      guesses.room === confidential.location
    ) {
      handleNewGame();
      dispatch(openResponseModal());
    }
    const revealIndex = Math.floor(Math.random() * 3);
    switch (revealIndex) {
      case 0:
        if (confidential.murderer !== guesses.person) {
          dispatch(setEliminatedPeople(guesses.person));
          dispatch(dispatch(setThingToReveal(guesses.person)));
        } else if (confidential.location !== guesses.room) {
          dispatch(setEliminatedRooms(guesses.room));
          dispatch(setThingToReveal(guesses.room));
        } else if (confidential.weapon !== guesses.weapon) {
          dispatch(setEliminatedWeapons(guesses.weapons));
          dispatch(setThingToReveal(guesses.weapon));
        } else alert("I've got nothing to tell you");

        break;
      case 1:
        if (confidential.location !== guesses.room) {
          dispatch(setEliminatedRooms(guesses.room));
          dispatch(setThingToReveal(guesses.room));
        } else if (confidential.weapon !== guesses.weapon) {
          dispatch(setEliminatedWeapons(guesses.weapons));
          dispatch(setThingToReveal(guesses.weapon));
        } else if (confidential.murderer !== guesses.person) {
          dispatch(setEliminatedPeople(guesses.person));
          dispatch(setThingToReveal(guesses.person));
        } else alert("I've got nothing to tell you");
        break;
      case 2:
        if (confidential.murderer !== guesses.person) {
          dispatch(setEliminatedPeople(guesses.person));
          dispatch(setThingToReveal(guesses.person));
        } else if (confidential.weapon !== guesses.weapon) {
          dispatch(setEliminatedWeapons(guesses.weapons));
          dispatch(setThingToReveal(guesses.weapon));
        } else if (confidential.location !== guesses.room) {
          dispatch(setEliminatedRooms(guesses.room));
          dispatch(setThingToReveal(guesses.room));
        } else alert("I've got nothing to tell you");
        break;
    }
    dispatch(openResponseModal());
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

          {rooms.map((room: string) => (
            <div key={room} className="mr-5 mt-2">
              {eliminatedRooms.includes(room) && (
                <div className=" line-through">{room}</div>
              )}
              {!eliminatedRooms.includes(room) && (
                <div className="flex">
                  <input
                    type="checkbox"
                    readOnly
                    checked={room === currentRoom}
                  />
                  <div className="mr-5">{room}</div>
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
