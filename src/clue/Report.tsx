import { useSelector, useDispatch } from "react-redux";
import { alibis } from "./alibis";
import { startNewGame } from "./clueSlice";

const Report = () => {
  const guesses = useSelector((state: any) => state.clue.guesses);
  const confidential = useSelector((state: any) => state.clue.confidential);
  const isGameOver = useSelector((state: any) => state.clue.isGameOver);
  const thingToReveal = useSelector((state: any) => state.clue.thingToReveal);
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col fixed h-[80%] w-[80%] bg-amber-700">
      {isGameOver && (
        <div className="flex flex-col">
          Game Over!! You win!!! Click the button below to play a new game
          <button
            className="mt-10 cursor-pointer"
            onClick={() => dispatch(startNewGame())}
          >
            New game
          </button>
        </div>
      )}
      {!isGameOver && (
        <div>
          <div>So here's the deal</div>
          {thingToReveal === guesses.person &&
            thingToReveal !== confidential.person && (
              <div>
                <div className="mb-10">It can't have been {thingToReveal}</div>
                {/* <div className="mb-5">
                I saw {personGuessed} two minutes before sneaking up the stairs
              </div> */}
                <div>{alibis[Math.floor(Math.random() * 5)]}</div>
              </div>
            )}
          {thingToReveal === guesses.room &&
            thingToReveal !== confidential.room && (
              <div>
                <div>It can't have been {thingToReveal}</div>
                <div>
                  That room shows up on the security cameras and we can see that
                  no one went in the whole night.
                </div>
              </div>
            )}
          {thingToReveal === guesses.weapon &&
            thingToReveal !== confidential.weapon && (
              <div>
                <div>It can't have been {thingToReveal}</div>
                <div>
                  I had that weapon in my backpack the whole time cause I've
                  been planning to use it to kill the old man myself! But
                  somebody got to him first
                </div>
              </div>
            )}
        </div>
      )}
    </div>
  );
};

export default Report;
