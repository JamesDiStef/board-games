import { useState } from "react";
import { characters, weapons } from "./ClueBoard";

interface Props {
  room: string;
  confidential: any;
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
  const [eliminatedPeople] = useState(["Professor Plum"]);
  const [eliminatedWeapons] = useState(["Lead Pipe"]);
  const [eliminateddRooms] = useState(["Ballroom"]);
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
    console.log(confidential);
    const revealIndex = Math.floor(Math.random() * 3);
    switch (revealIndex) {
      case 0:
        if (!eliminatedPeople.includes(confidential.murderer))
          console.log(confidential.murderer);
        else if (!eliminateddRooms.includes(confidential.location))
          console.log(confidential.location);
        else if (!eliminatedWeapons.includes(confidential.weapons))
          console.log(confidential.weapon);
        break;
      case 1:
        console.log(confidential.location);
        break;
      case 2:
        console.log(confidential.weapon);
        break;
    }
    // if(confidential.room === room)
  };

  return (
    <div className="flex ml-[10%] mt-[3%] fixed h-[80%] w-[80%] bg-amber-700">
      <div className="w-3/4 flex flex-col">
        <div className="h-1/4 flex">
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
        <div className="h-1/4 flex">
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
        <div className="h-1/4 flex flex-wrap">
          {rooms.map((room: string) => (
            <div>
              <input type="checkbox" checked={guesses.room === room} />
              <div className="mr-5">{room}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="text-lg font-semibold">I accuse:</div>
        <div className="text-xl font-medium mt-2">{guesses.person}</div>
        <div className="text-lg">In the</div>
        <div className="text-xl font-medium mt-2">{guesses.room}</div>
        <div className="text-lg">with the</div>

        <div className="text-xl font-medium mt-2">{guesses.weapon}</div>
        <button
          onClick={onGuess}
          className="rounded border-2 bg-yellow-100 w-full ml-[20%] cursor-pointer"
        >
          Guess
        </button>
      </div>
    </div>
  );
};

export default GuessPanel;
