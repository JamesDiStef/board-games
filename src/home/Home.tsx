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
    <div className="flex justify-center items-center bg-[url('https://boardgamesj.s3.us-east-2.amazonaws.com/checkers.avif')] bg-cover bg-no-repeat bg-center min-h-screen w-full">
      <div className="flex flex-col w-full items-center">
        <form
          className="w-11/12 max-w-md flex flex-col bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="mb-4 h-11 px-4 rounded-md border border-gray-300"
            type="text"
            placeholder="Username"
            value={userId}
            onChange={(e) => dispatch(setUserId(e.target.value))}
          />
          <input
            className="mb-4 h-11 px-4 rounded-md border border-gray-300"
            type="password"
            placeholder="Password"
          />
          <button
            disabled={userId.length === 0}
            onClick={() => fetchUser()}
            className="bg-amber-500 text-black font-semibold h-12 mt-2 w-full rounded-md"
          >
            Sign In
          </button>
          <button
            disabled={userId.length === 0}
            onClick={() => fetchUser()}
            className="bg-amber-500 text-black font-semibold h-12 mt-4 w-full rounded-md"
          >
            Create Account
          </button>
        </form>
        <button
          onClick={continueAsGuest}
          className="bg-amber-500 text-black font-semibold h-10 mt-6 w-11/12 max-w-xs rounded-md"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default Home;
