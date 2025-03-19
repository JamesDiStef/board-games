import { useDispatch, useSelector } from "react-redux";
import { setPlayerName } from "../clue/clueSlice";

const Home = () => {
  const playerName = useSelector((state: any) => state.clue.playerName);
  const dispatch = useDispatch();

  const handleSetPlayerName = (name: string) => {
    dispatch(setPlayerName(name));
  };

  const handleLogin = () => {
    dispatch(setPlayerName(name));
  };
  return (
    <div className="flex justify-center">
      <div className="flex flex-col ">
        <div className="flex justify-center mt-10">
          <p>
            Sign in to rejoin your existing games. Don't want to make an
            account? No problem. Just click one of the link on the top to start
            playing
          </p>
        </div>
        <form className="mt-36 mx-auto w-1/2 flex flex-col bg-slate-300">
          <input
            className="mx-10 my-6 h-10 p-2"
            type="text"
            placeholder="username"
            value={playerName}
            onChange={(e) => handleSetPlayerName(e.target.value)}
          />
          <input
            className="mx-10 my-6 h-10 p-2"
            type="password"
            placeholder="password"
          />
          <button className="bg-lime-100 h-10 mx-auto mt-2 w-1/4 border-2 button cursor-pointer rounded-xl">
            Sign In
          </button>
          <button
            onClick={handleLogin}
            className="bg-lime-100 h-10 mx-auto mt-2 mb-4 w-1/4 border-2 button cursor-pointer rounded-xl"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
