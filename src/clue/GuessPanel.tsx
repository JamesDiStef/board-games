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

const GuessPanel = ({ room, confidential }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [eliminatedPeople, setEliminatedPeople] = useState<string[]>([]);
  const [eliminatedWeapons, setEliminatedWeapons] = useState<string[]>([]);
  const [eliminatedRooms, setEliminatedRooms] = useState<string[]>([]);
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
        } else if (confidential.location !== guesses.room) {
          setEliminatedRooms([...eliminatedRooms, guesses.room]);
        } else if (confidential.weapon !== guesses.weapon) {
          setEliminatedWeapons([...eliminatedWeapons, guesses.weapon]);
        } else alert("I've got nothing to tell you");

        break;
      case 1:
        if (confidential.location !== guesses.room) {
          setEliminatedRooms([...eliminatedRooms, guesses.room]);
        } else if (confidential.weapon !== guesses.weapon) {
          setEliminatedWeapons([...eliminatedWeapons, guesses.weapon]);
        } else if (confidential.murderer !== guesses.person) {
          setEliminatedPeople([...eliminatedPeople, guesses.person]);
        } else alert("I've got nothing to tell you");
        break;
      case 2:
        if (confidential.murderer !== guesses.person) {
          setEliminatedPeople([...eliminatedPeople, guesses.person]);
        } else if (confidential.weapon !== guesses.weapon) {
          setEliminatedWeapons([...eliminatedWeapons, guesses.weapon]);
        } else if (confidential.location !== guesses.room) {
          setEliminatedRooms([...eliminatedRooms, guesses.room]);
        } else alert("I've got nothing to tell you");
        break;
    }
    setIsOpenModal(true);
  };

  return (
    <div className="flex flex-col ml-[10%] mt-[3%] fixed h-[80%] w-[80%] bg-amber-700">
      {isOpenModal && (
        <Report isGameOver={isGameOver} personGuessed={guesses.person} />
      )}
      <div className="h-3/4 flex ">
        <div className="w-1/4 flex flex-col">
          {characters.map((char: string) => (
            <div>
              {eliminatedPeople.includes(char) && (
                <div className="mr-5 mt-5 line-through">{char}</div>
              )}
              {!eliminatedPeople.includes(char) && (
                <div>
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
          {weapons.map((weapon: string) => (
            <div>
              {eliminatedWeapons.includes(weapon) && (
                <div className="mr-5 mt-5 line-through">{weapon}</div>
              )}
              {!eliminatedWeapons.includes(weapon) && (
                <div>
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
        <div className="w-1/2 flex flex-wrap">
          {rooms.map((room: string) => (
            <div>
              <input type="checkbox" checked={guesses.room === room} />
              <div className="mr-5">{room}</div>
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
