import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "./homeSlice";

const Home = () => {
  const newApi = import.meta.env.VITE_NEW_API_URL;

  const userId = useSelector((state: any) => state.user.userId);
  const dispatch = useDispatch();

  const fetchUser = async () => {
    const response = await fetch(`${newApi}/user/${userId}`);
    const user = await response.json();
    if (user.length > 0) {
      console.log(user[0]);
      dispatch(setUserId(userId));
    } else {
      createUser();
    }
  };

  const createUser = async () => {
    const response = await fetch(`${newApi}/user/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    await response.json();
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
        <form
          className="mt-36 mx-auto w-1/2 flex flex-col bg-slate-300"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="mx-10 my-6 h-10 p-2"
            type="text"
            placeholder="username"
            value={userId}
            onChange={(e) => dispatch(setUserId(e.target.value))}
          />
          <input
            className="mx-10 my-6 h-10 p-2"
            type="password"
            placeholder="password"
          />
          <button
            onClick={() => fetchUser()}
            className="bg-lime-100 h-10 mx-auto mt-2 w-1/4 border-2 button cursor-pointer rounded-xl"
          >
            Sign In
          </button>
          <button className="bg-lime-100 h-10 mx-auto mt-2 mb-4 w-1/4 border-2 button cursor-pointer rounded-xl">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
