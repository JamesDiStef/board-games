import { alibis } from "./alibis";

interface Props {
  isGameOver: boolean;
  personGuessed?: string;
  roomGuessed?: string;
  weaponGuessed?: string;
}

const Report = ({
  isGameOver,
  personGuessed = "",
  roomGuessed = "",
  weaponGuessed = "",
}: Props) => {
  return (
    <div className="flex flex-col fixed h-[80%] w-[80%] bg-amber-700">
      {isGameOver && <div>Game Over!! You win!!!</div>}
      {!isGameOver && (
        <div>
          <div>So here's the deal</div>
          {personGuessed !== "" && (
            <div>
              <div className="mb-10">It can't have been {personGuessed}</div>
              {/* <div className="mb-5">
                I saw {personGuessed} two minutes before sneaking up the stairs
              </div> */}
              <div>{alibis[Math.floor(Math.random() * 5)]}</div>
            </div>
          )}
          {roomGuessed !== "" && (
            <div>
              <div>It can't have been {roomGuessed}</div>
              <div>
                That room shows up on the security cameras and we can see that
                no one went in the whole night.
              </div>
            </div>
          )}
          {weaponGuessed !== "" && (
            <div>
              <div>It can't have been {weaponGuessed}</div>
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
