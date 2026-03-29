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
    <div className="flex flex-col w-full bg-[#f5f0e0] border-4 border-amber-800 shadow-2xl overflow-hidden">
      {/* Header */}
      <div className="bg-red-900 py-3 px-6 flex-shrink-0">
        <h2
          className="text-yellow-200 text-xl font-bold tracking-widest uppercase text-center"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {isGameOver ? "Case Solved!" : "Evidence Revealed"}
        </h2>
      </div>

      <div className="p-8 flex flex-col items-center justify-center text-center gap-6">
        {isGameOver && (
          <>
            <div
              className="text-2xl font-bold text-green-800"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Brilliant detective work!
            </div>
            <div className="text-amber-900 text-base">
              {guesses.person} — in the {guesses.room} — with the {guesses.weapon}
            </div>
            <button
              className="bg-red-900 hover:bg-red-800 text-yellow-200 font-bold py-2 px-10 border-2 border-yellow-600 uppercase tracking-widest transition-colors cursor-pointer"
              style={{ fontFamily: "Georgia, serif" }}
              onClick={() => dispatch(startNewGame())}
            >
              New Game
            </button>
          </>
        )}
        {!isGameOver && (
          <>
            <div
              className="text-amber-800 text-lg italic"
              style={{ fontFamily: "Georgia, serif" }}
            >
              "So here's the deal..."
            </div>
            {thingToReveal === guesses.person &&
              thingToReveal !== confidential.person && (
                <div className="bg-amber-100 border border-amber-400 p-6 max-w-lg">
                  <div
                    className="font-bold text-red-900 text-xl mb-3"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    It wasn't {thingToReveal}!
                  </div>
                  <div className="text-amber-800 italic">
                    {alibis[Math.floor(Math.random() * 5)]}
                  </div>
                </div>
              )}
            {thingToReveal === guesses.room &&
              thingToReveal !== confidential.room && (
                <div className="bg-amber-100 border border-amber-400 p-6 max-w-lg">
                  <div
                    className="font-bold text-red-900 text-xl mb-3"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Not the {thingToReveal}!
                  </div>
                  <div className="text-amber-800 italic">
                    That room shows up on the security cameras and we can see
                    that no one went in the whole night.
                  </div>
                </div>
              )}
            {thingToReveal === guesses.weapon &&
              thingToReveal !== confidential.weapon && (
                <div className="bg-amber-100 border border-amber-400 p-6 max-w-lg">
                  <div
                    className="font-bold text-red-900 text-xl mb-3"
                    style={{ fontFamily: "Georgia, serif" }}
                  >
                    Not the {thingToReveal}!
                  </div>
                  <div className="text-amber-800 italic">
                    I had that weapon in my backpack the whole time cause I've
                    been planning to use it to kill the old man myself! But
                    somebody got to him first.
                  </div>
                </div>
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default Report;
