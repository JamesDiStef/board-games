import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserId } from "./homeSlice";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "./homeThunks";
import { AppDispatch } from "../store";

const Register = () => {
  const userId = useSelector((state: any) => state.user.userId);
  const error = useSelector((state: any) => state.user.error);
  const loading = useSelector((state: any) => state.user.loading);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [matchError, setMatchError] = useState<string | null>(null);

  const handleCreateAccount = async () => {
    if (password !== confirmPassword) {
      setMatchError("Passwords do not match");
      return;
    }
    setMatchError(null);
    const result = await dispatch(registerUser({ userId, password }));
    if (registerUser.fulfilled.match(result)) {
      navigate("/connectFour");
    }
  };

  const canSubmit = userId.length > 0 && password.length > 0 && !loading;

  return (
    <div className="flex justify-center items-center bg-[url('https://boardgamesj.s3.us-east-2.amazonaws.com/checkers.avif')] bg-cover bg-no-repeat bg-center min-h-screen w-full">
      <div className="flex flex-col w-full items-center">
        <form
          className="w-11/12 max-w-md flex flex-col bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="text-2xl font-bold text-center mb-6 text-amber-700">
            Create Account
          </h1>

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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="mb-4 h-11 px-4 rounded-md border border-gray-300"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {matchError && (
            <p className="mb-3 text-sm text-red-600 text-center">{matchError}</p>
          )}
          {error && (
            <p className="mb-3 text-sm text-red-600 text-center">{error}</p>
          )}

          <button
            disabled={!canSubmit}
            onClick={handleCreateAccount}
            className="bg-amber-500 text-black font-semibold h-12 w-full rounded-md disabled:opacity-50"
          >
            {loading ? "Creating account…" : "Create Account"}
          </button>

          <Link
            to="/"
            className="mt-4 text-sm text-gray-500 underline text-center"
          >
            Back to Sign In
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
