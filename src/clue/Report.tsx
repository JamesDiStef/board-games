import { alibis } from "./alibis";

interface Props {
  isGameOver: boolean;
  confidential: {
    murderer: string;
    weapon: string;
    location: string;
  };
  thingToReveal: string;
  guesses: {
    person: string;
    weapon: string;
    room: string;
  };
  handleNewGame: () => void;
}

const Report = ({
  isGameOver,
  confidential,
  thingToReveal,
  guesses,
  handleNewGame,
}: Props) => {
  console.log(thingToReveal, confidential);

  return (
    <div className="flex flex-col fixed h-[80%] w-[80%] bg-amber-700">
      {isGameOver && (
        <div>
          Game Over!! You win!!! Click the button below to play a new game
          <button onClick={handleNewGame}>New game</button>
        </div>
      )}
      {!isGameOver && (
        <div>
          <div>So here's the deal</div>
          {thingToReveal === guesses.person && (
            <div>
              <div className="mb-10">It can't have been {thingToReveal}</div>
              {/* <div className="mb-5">
                I saw {personGuessed} two minutes before sneaking up the stairs
              </div> */}
              <div>{alibis[Math.floor(Math.random() * 5)]}</div>
            </div>
          )}
          {thingToReveal === guesses.room && (
            <div>
              <div>It can't have been {thingToReveal}</div>
              <div>
                That room shows up on the security cameras and we can see that
                no one went in the whole night.
              </div>
            </div>
          )}
          {thingToReveal === guesses.weapon && (
            <div>
              <div>It can't have been {thingToReveal}</div>
              <div>
                I had that weapon in my backpack the whole time cause I've been
                planning to use it to kill the old man myself! But somebody got
                to him first
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Report;
