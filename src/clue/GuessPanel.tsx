import { useState } from "react";
import { characters, weapons } from "./ClueBoard";
import Report from "./Report";

interface Props {
  room: string;
  confidential: {
    murderer: string;
    weapon: string;
    location: string;
  };
  eliminatedPeople: string[];
  setEliminatedPeople: (people: string[]) => void;
  eliminatedRooms: string[];
  setEliminatedRooms: (rooms: string[]) => void;
  eliminatedWeapons: string[];
  setEliminatedWeapons: (weapons: string[]) => void;
  isGameOver: boolean;
  setIsGameOver: (isGameOver: boolean) => void;
  handleNewGame: () => void;
}

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

const GuessPanel = ({
  room,
  confidential,
  isGameOver,
  setIsGameOver,
  eliminatedPeople,
  setEliminatedPeople,
  eliminatedRooms,
  setEliminatedRooms,
  eliminatedWeapons,
  setEliminatedWeapons,
  handleNewGame,
}: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [thingToReveal, setThingToReveal] = useState("");
  const [guesses, setGuesses] = useState({
    person: "",
    weapon: "",
    room: room,
  });

  const selectWeapon = (weapon: string) => {
    setGuesses({
      ...guesses,
      weapon: weapon,
    });
  };

  const selectPerson = (person: string) => {
    setGuesses({
      ...guesses,
      person: person,
    });
  };

  const onGuess = () => {
    if (
      guesses.person === confidential.murderer &&
      guesses.weapon === confidential.weapon &&
      guesses.room === confidential.location
    ) {
      setIsGameOver(true);
      setIsOpenModal(true);
    }
    const revealIndex = Math.floor(Math.random() * 3);
    switch (revealIndex) {
      case 0:
        if (confidential.murderer !== guesses.person) {
          setEliminatedPeople([...eliminatedPeople, guesses.person]);
          setThingToReveal(guesses.person);
        } else if (confidential.location !== guesses.room) {
          setEliminatedRooms([...eliminatedRooms, guesses.room]);
          setThingToReveal(guesses.room);
        } else if (confidential.weapon !== guesses.weapon) {
          setEliminatedWeapons([...eliminatedWeapons, guesses.weapon]);
          setThingToReveal(guesses.weapon);
        } else alert("I've got nothing to tell you");

        break;
      case 1:
        if (confidential.location !== guesses.room) {
          setEliminatedRooms([...eliminatedRooms, guesses.room]);
          setThingToReveal(guesses.room);
        } else if (confidential.weapon !== guesses.weapon) {
          setEliminatedWeapons([...eliminatedWeapons, guesses.weapon]);
          setThingToReveal(guesses.weapon);
        } else if (confidential.murderer !== guesses.person) {
          setEliminatedPeople([...eliminatedPeople, guesses.person]);
          setThingToReveal(guesses.person);
        } else alert("I've got nothing to tell you");
        break;
      case 2:
        if (confidential.murderer !== guesses.person) {
          setEliminatedPeople([...eliminatedPeople, guesses.person]);
          setThingToReveal(guesses.person);
        } else if (confidential.weapon !== guesses.weapon) {
          setEliminatedWeapons([...eliminatedWeapons, guesses.weapon]);
          setThingToReveal(guesses.weapon);
        } else if (confidential.location !== guesses.room) {
          setEliminatedRooms([...eliminatedRooms, guesses.room]);
          setThingToReveal(guesses.room);
        } else alert("I've got nothing to tell you");
        break;
    }
    setIsOpenModal(true);
  };

  return (
    <div className="flex flex-col ml-[10%] mt-[3%] fixed h-[80%] w-[80%] bg-amber-700">
      {isOpenModal && (
        <Report
          isGameOver={isGameOver}
          thingToReveal={thingToReveal}
          confidential={confidential}
          guesses={guesses}
          handleNewGame={handleNewGame}
        />
      )}
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
                    checked={guesses.room === room}
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
