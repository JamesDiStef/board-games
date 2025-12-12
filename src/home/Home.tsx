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
          className="w-11/12 max-w-md flex flex-col bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8 gap-4"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Board Games</h1>
          <input
            className="h-12 px-4 rounded-lg border-2 border-gray-300 focus:border-amber-500 focus:outline-none transition-colors duration-200 font-medium"
            type="text"
            placeholder="Username"
            value={userId}
            onChange={(e) => dispatch(setUserId(e.target.value))}
          />
          <input
            className="h-12 px-4 rounded-lg border-2 border-gray-300 focus:border-amber-500 focus:outline-none transition-colors duration-200 font-medium"
            type="password"
            placeholder="Password"
          />
          <button
            disabled={userId.length === 0}
            onClick={() => fetchUser()}
            className="bg-amber-500 hover:bg-amber-600 disabled:bg-gray-400 text-black font-bold h-12 w-full rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Sign In
          </button>
          <button
            disabled={userId.length === 0}
            onClick={() => fetchUser()}
            className="bg-amber-500 hover:bg-amber-600 disabled:bg-gray-400 text-black font-bold h-12 w-full rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
          >
            Create Account
          </button>
        </form>
        <button
          onClick={continueAsGuest}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold h-12 mt-6 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
        >
          Continue as Guest
        </button>
      </div>
    </div>
  );
};

export default Home;
