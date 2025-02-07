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
    <div className="h-full flex flex-col  gap-4 px-4 justify-center">
      {userLoggedIn && <Navigate to={"/verification"} replace={true} />}
      <p
        className="mb-4 font-montserrat
      "
      >
        Welcome to Valediktoria. Log into your account here.
      </p>
      <form
        className="flex font-montserrat flex-col justify-center  gap-4 w-[300px]"
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
          className="w-full py-1 px-4 border bg-first border-third rounded-xl placeholder-third"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-full py-1 px-4 border bg-first border-third rounded-xl placeholder-third"
        />
        {errorMessage && (
          <span className="text-red-600 text-sm">
            Wrong credentials. Please try again.
          </span>
        )}

        <button
          type="submit"
          disabled={isSigningIn}
          className="py-1 text-first font-montserrat font-semibold px-16 bg-second rounded-xl text-sm hover:bg-third w-max"
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
          className="py-1 bg-second rounded-xl text-first font-montserrat font-semibold text-sm hover:bg-third px-16 "
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
