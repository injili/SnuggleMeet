import { Link, Navigate } from "react-router-dom";
import theLogo from "../assets/img/snuggle.png";
import { doSignInWithGoogle, dosignInWithEmailAndPassword } from "../api/auth";
import { useAuth } from "../api/context";
import { useState } from "react";

export default function Login() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function handleClose() {
    setErrorMessage("");
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await dosignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setIsSigningIn(false);
        setErrorMessage(err);
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center">
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <img src={theLogo} height={120} width={120} />
      <h1 className="font-thin font-bowldy text-3xl my-4 text-second tracking-wide">
        LOGIN PAGE
      </h1>
      <form
        className="flex font-alata flex-col items-center justify-center gap-2 w-[200px]"
        onSubmit={onSubmit}
      >
        <input
          type="text"
          required
          placeholder="EMAIL"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />
        <input
          type="password"
          required
          placeholder="PASSWORD"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />
        {errorMessage && (
          <div
            role="alert"
            className=" absolute border border-forth top-4 right-4 bg-second p-2"
          >
            <div className="flex items-center gap-4">
              <span className="text-forth">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>

              <div className="flex-1">
                <p className="text-forth text-sm">
                  Wrong login credentials. Try again
                </p>
              </div>

              <button
                onClick={handleClose}
                className="text-forth transition hover:text-fifth"
              >
                <span className="sr-only">Dismiss popup</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isSigningIn}
          className="py-1 w-full text-second font-semibold font-alata px-4 border border-2 bg-third border-second"
        >
          {isSigningIn ? "Logging In..." : "LOG IN"}
        </button>
      </form>
      <p className="font-alata">or</p>
      <p className="font-alata">
        Log in with
        <button
          disabled={isSigningIn}
          onClick={(e) => {
            onGoogleSignIn(e);
          }}
          className="text-forth font-semibold text-lg hover:text-third px-2"
        >
          {isSigningIn ? "Signing In..." : "google"}
        </button>
      </p>

      <p className="font-alata text-sm mt-4">
        Don&apos;t have an account?{" "}
        <Link to="/signup">
          <button className="text-forth font-semibold hover:text-third px-2">
            Sign Up
          </button>
        </Link>
      </p>
    </div>
  );
}
