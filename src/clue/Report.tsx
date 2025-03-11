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
              <div className="mb-5">
                I saw {personGuessed} two minutes before sneaking up the stairs
              </div>
              <div>{alibis[0]}</div>
            </div>
          )}
          {roomGuessed !== "" && (
            <div>
              <div>It can't have been {roomGuessed}</div>
              <div>I saw them two minutes before sneaking up the stairs</div>
            </div>
          )}
          {weaponGuessed !== "" && (
            <div>
              <div>It can't have been {weaponGuessed}</div>
              <div>I saw them two minutes before sneaking up the stairs</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Report;
