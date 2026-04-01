import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "./homeSlice";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./homeThunks";
import { AppDispatch } from "../store";

const Home = () => {
  const userId = useSelector((state: any) => state.user.userId);
  const error = useSelector((state: any) => state.user.error);
  const loading = useSelector((state: any) => state.user.loading);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"default" | "signin">("default");

  const goToNextPage = () => navigate("/connectFour");

  const continueAsGuest = () => {
    dispatch(setUserId(""));
    goToNextPage();
  };

  const handleSignIn = async () => {
    const result = await dispatch(loginUser({ userId, password }));
    if (loginUser.fulfilled.match(result)) {
      goToNextPage();
    }
  };

  const handleBack = () => {
    setMode("default");
    setPassword("");
  };

  const canSubmit = userId.length > 0 && !loading;

  return (
    <div className="flex justify-center items-center bg-[url('https://boardgamesj.s3.us-east-2.amazonaws.com/checkers.avif')] bg-cover bg-no-repeat bg-center min-h-screen w-full">
      <div className="flex flex-col w-full items-center">
        <form
          className="w-11/12 max-w-md flex flex-col bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-amber-700">
            Board Games
          </h1>

          <input
            className="mb-4 h-11 px-4 rounded-md border border-gray-300"
            type="text"
            placeholder="Username"
            value={userId}
            onChange={(e) => dispatch(setUserId(e.target.value))}
          />

          {mode === "signin" && (
            <>
              <input
                className="mb-4 h-11 px-4 rounded-md border border-gray-300"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
              {error && (
                <p className="mb-3 text-sm text-red-600 text-center">{error}</p>
              )}
              <button
                disabled={!canSubmit}
                onClick={handleSignIn}
                className="bg-amber-500 text-black font-semibold h-12 w-full rounded-md disabled:opacity-50"
              >
                {loading ? "Signing in…" : "Submit"}
              </button>
              <button
                onClick={handleBack}
                className="mt-3 text-sm text-gray-500 underline"
              >
                Back
              </button>
            </>
          )}

          {mode === "default" && (
            <>
              <button
                disabled={userId.length === 0}
                onClick={() => setMode("signin")}
                className="bg-amber-500 text-black font-semibold h-12 w-full rounded-md disabled:opacity-50"
              >
                Sign In
              </button>
              <Link
                to="/register"
                className="bg-amber-500 text-black font-semibold h-12 mt-4 w-full rounded-md flex items-center justify-center"
              >
                Create Account
              </Link>
            </>
          )}
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
