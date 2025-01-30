import { Link, Navigate } from "react-router-dom";
import { doSignInWithGoogle, dosignInWithEmailAndPassword } from "../api/auth";
import { useAuth } from "../api/context";
import { useState } from "react";

export default function SignIn() {
  const { userLoggedIn } = useAuth();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // function handleClose() {
  //   setErrorMessage("");
  // }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn && !emailError) {
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

  const checkEmail = (theemail) => {
    const validEmail = /^\S+@\S+\.\S+$/;
    if (theemail !== "") {
      setEmailError(!validEmail.test(theemail));
    } else {
      setEmailError(false);
    }
  };

  return (
    <div className="h-full flex flex-col gap-2 px-4 justify-center">
      {userLoggedIn && <Navigate to={"/verification"} replace={true} />}
      <p
        className="mb-4 font-montserrat
      "
      >
        Welcome to Valediktoria. Log into your account here.
      </p>
      <form
        className="flex font-montserrat flex-col justify-center gap-2 w-[300px]"
        onSubmit={onSubmit}
      >
        {emailError && (
          <span className="text-red-600 text-sm">
            The email is invalid and might have spaces.
          </span>
        )}
        <input
          type="text"
          required
          placeholder="Email Address"
          value={email}
          onChange={(e) => {
            const t = e.target.value;
            setEmail(t);
            checkEmail(t);
          }}
          className="w-full py-1 px-4 border border-2 bg-first border-third rounded-full"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full py-1 px-4 border border-2 bg-first border-third rounded-full"
        />
        {/* {errorMessage && (
          <div
            role="alert"
            className=" absolute border border- top-4 right-4 bg-third p-2 rounded-lg"
          >
            <div className="flex items-center gap-4">
              <span className="text-first">
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
                <p className="text-first font-alata text-sm">
                  Wrong credentials. Try again
                </p>
              </div>

              <button
                onClick={handleClose}
                className="text-first transition hover:text-second"
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
        )} */}

        {errorMessage && (
          <span className="text-red-600 text-sm">
            Wrong credentials. Please try again.
          </span>
        )}

        <button
          type="submit"
          disabled={isSigningIn}
          className="py-2 text-first font-alata px-16 bg-second rounded-full text-sm hover:bg-third w-max"
        >
          {isSigningIn ? "Signing In..." : "Sign In"}
        </button>
      </form>
      <p className="font-montserrat">or</p>
      <p className="font-alata">
        <button
          disabled={isSigningIn}
          onClick={(e) => {
            onGoogleSignIn(e);
          }}
          className="py-2 bg-second rounded-full text-first text-sm hover:bg-third px-16 "
        >
          {isSigningIn ? "Signing In..." : "Sign In with Google"}
        </button>
      </p>

      <p className="font-montserrat mt-4">
        Don&apos;t have an account?{" "}
        <Link to="/signup">
          <button className="text-third hover:text-second px-2  underline">
            Sign Up
          </button>
        </Link>
      </p>
    </div>
  );
}
