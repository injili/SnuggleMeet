import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import theLogo from "../assets/img/snuggle.png";
import { useAuth } from "../api/context";
import { doCreateUserWithEmailAndPassword } from "../api/auth";

export default function Signup() {
  const navigate = useNavigate();

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
      await doCreateUserWithEmailAndPassword(email, password);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center">
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <img src={theLogo} height={120} width={120} />
      <h1 className="font-thin font-bowldy text-3xl my-4 text-second tracking-wide">
        SIGNUP PAGE
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex font-alata flex-col items-center justify-center gap-2 w-[200px]"
      >
        <input
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="EMAIL"
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />
        <input
          disabled={isRegistering}
          type="password"
          required
          autoComplete="new-password"
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />

        <input
          disabled={isRegistering}
          type="password"
          autoComplete="off"
          required
          placeholder="CONFIRM PASSWORD"
          value={confirmPassword}
          onChange={(e) => {
            setconfirmPassword(e.target.value);
          }}
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />

        {errorMessage && (
          <span className="text-red-600 text-sm">{errorMessage}</span>
        )}
        <button
          type="submit"
          disabled={isRegistering}
          className="py-1 w-full text-second font-semibold font-alata px-4 border border-2 bg-third border-second"
        >
          {isRegistering ? "Signing Up..." : "SIGN UP"}
        </button>
      </form>
      <p className="font-alata">or</p>
      <p className="font-alata">
        Sign up with
        <button className="text-forth font-semibold text-lg hover:text-third px-2">
          google
        </button>
      </p>

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
