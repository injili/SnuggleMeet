import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../api/context";
import { doCreateUserWithEmailAndPassword } from "../api/auth";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        await doCreateUserWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(
          error.message || "An error occurred. Please try again."
        );
      } finally {
        setIsRegistering(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-2 justify-center px-4">
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <form
        onSubmit={onSubmit}
        className="flex font-montserrat flex-col justify-center gap-2"
      >
        <div className="flex w-full gap-2 items-center justify-center">
          <input
            type="text"
            required
            placeholder="First Name"
            className="w-full py-1 px-4 border border-2 bg-first border-third rounded-full"
          />
          <input
            type="text"
            required
            placeholder="Last Name"
            className="w-full py-1 px-4 border border-2 bg-first border-third rounded-full"
          />
        </div>

        <input
          type="text"
          required
          placeholder="Username"
          className="w-1/2 py-1 px-4 border border-2 bg-first border-third rounded-full"
        />
        <input
          type="datetime"
          required
          placeholder="Date of Birth"
          className="w-1/2 py-1 px-4 border border-2 bg-first border-third rounded-full"
        />
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="email address"
          className="w-1/2 py-1 px-4 border border-2 bg-first border-third rounded-full"
        />
        <div className="flex w-full gap-2 items-center justify-center">
          <input
            disabled={isRegistering}
            type="password"
            required
            autoComplete="new-password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="w-full py-1 px-4 border border-2 bg-first border-third rounded-full"
          />

          <input
            disabled={isRegistering}
            type="password"
            autoComplete="off"
            required
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => {
              setconfirmPassword(e.target.value);
            }}
            className="w-full py-1 px-4 border border-2 bg-first border-third rounded-full"
          />
        </div>

        {errorMessage && (
          <span className="text-red-600 text-sm">{errorMessage}</span>
        )}
        <button
          type="submit"
          disabled={isRegistering}
          className="text-third font-alata py-1 px-4 border border-2 bg-first border-third rounded-full"
        >
          {isRegistering ? "Signing Up..." : "SIGN UP"}
        </button>
      </form>

      <p className="font-alata text-sm mt-4">
        Already Have an account?{" "}
        <Link to="/">
          <button className="text-forth font-semibold hover:text-third px-2">
            Log in
          </button>
        </Link>
      </p>
    </div>
  );
}
