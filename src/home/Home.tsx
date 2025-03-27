import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "./homeSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const newApi = import.meta.env.VITE_NEW_API_URL;

  const userId = useSelector((state: any) => state.user.userId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToNextPage = () => {
    navigate("/connectFour");
  };

  const continueAsGuest = () => {
    dispatch(setUserId(""));
    goToNextPage();
  };

  const fetchUser = async () => {
    const response = await fetch(`${newApi}/user/${userId}`);
    const user = await response.json();
    if (user.length > 0) {
      console.log(user[0]);
      dispatch(setUserId(userId));
    } else {
      createUser();
    }
    goToNextPage();
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
      <div className="flex flex-col w-full">
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
            disabled={userId.length === 0}
            onClick={() => fetchUser()}
            className="bg-lime-100 h-12 mx-auto mt-2 w-1/2 md:w-1/4 border-2 button cursor-pointer rounded-xl"
          >
            Sign In
          </button>
          <button
            disabled={userId.length === 0}
            onClick={() => fetchUser()}
            className="bg-lime-100 h-12 mx-auto mt-4 mb-4 w-1/2 md:w-1/4 border-2 button cursor-pointer rounded-xl"
          >
            Create Account
          </button>
        </form>
        <button
          onClick={continueAsGuest}
          className="bg-lime-100 h-10 mx-auto mt-8 mb-4 w-1/2 md:w-1/4 border-2 button cursor-pointer rounded-xl"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default Home;
