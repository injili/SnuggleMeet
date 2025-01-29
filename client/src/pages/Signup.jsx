import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../api/context";
import {
  doSignInWithGoogle,
  doCreateUserWithEmailAndPassword,
} from "../api/auth";
import { createUserProfile } from "../api/userinfo";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { userLoggedIn } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  const onSubmit = () => {
    const a = createUser();
    if (a) {
      setUserID(a);
      createUserProfile(
        firstName,
        lastName,
        userName,
        dateOfBirth,
        termsAndConditions,
        privacyPolicy,
        userID
      );
    } else {
      setErrorMessage("Error Signing Up, Please Try Again");
    }
  };

  const createUser = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        const a = await doCreateUserWithEmailAndPassword(email, password);
        return a;
      } catch (error) {
        setErrorMessage(
          error.message || "An error occurred. Please try again."
        );
        return null;
      } finally {
        setIsRegistering(false);
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
    <div className="flex flex-col gap-2 justify-center px-4">
      {userLoggedIn && <Navigate to={"/home"} replace={true} />}
      <p
        className="mb-4 mt-2 font-montserrat
      "
      >
        Welcome to Valediktoria. Log into your account here.
      </p>
      <form
        onSubmit={onSubmit}
        className="flex font-montserrat flex-col justify-center gap-2"
      >
        <div className="flex w-full gap-2 items-center justify-center">
          <input
            type="text"
            required
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            placeholder="First Name"
            className="w-full py-1 px-4 border border-2 bg-first border-third rounded-full"
          />
          <input
            type="text"
            required
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            placeholder="Last Name"
            className="w-full py-1 px-4 border border-2 bg-first border-third rounded-full"
          />
        </div>
        <div className="flex w-full gap-2 items-center justify-center">
          <input
            type="text"
            required
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="Username"
            className="w-full py-1 px-4 border border-2 bg-first border-third rounded-full"
          />
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Email Address"
            className="w-full py-1 px-4 border border-2 bg-first border-third rounded-full"
          />
        </div>

        <input
          type="date"
          required
          value={dateOfBirth}
          onChange={(e) => {
            setDateOfBirth(e.target.value);
          }}
          placeholder="Date of Birth"
          className="w-1/2 py-1 px-4 border border-2 bg-first border-third rounded-full"
        />
        <div className="flex w-full gap-2 items-center justify-center">
          <input
            disabled={isRegistering}
            type="password"
            required
            autoComplete="new-password"
            placeholder="Password"
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
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              setconfirmPassword(e.target.value);
            }}
            className="w-full py-1 px-4 border border-2 bg-first border-third rounded-full"
          />
        </div>
        <div className="flex w-full gap-8 items-center text-sm py-2">
          <label>
            <input
              type="checkbox"
              value={termsAndConditions}
              onChange={(e) => {
                setTermsAndConditions(e.target.value);
              }}
            />{" "}
            I agree to the{" "}
            <button className="underline hover:text-second">
              Terms & Conditions
            </button>
            .
          </label>
          <label>
            <input
              type="checkbox"
              value={privacyPolicy}
              onChange={(e) => {
                setPrivacyPolicy(e.target.value);
              }}
            />{" "}
            I agree to the{" "}
            <button className="underline hover:text-second">
              Privacy Policy
            </button>
          </label>
        </div>

        {errorMessage && (
          <span className="text-red-600 text-sm">{errorMessage}</span>
        )}
        <button
          type="submit"
          disabled={isRegistering}
          className="text-first font-alata py-2 px-16 bg-second hover:bg-third rounded-full w-max text-sm"
        >
          {isRegistering ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p className="font-montserrat">or</p>
      <p className="font-alata">
        <button
          disabled={isSigningIn}
          onClick={(e) => {
            onGoogleSignIn(e);
          }}
          className="py-2 bg-second text-sm rounded-full text-first hover:bg-third px-16 "
        >
          {isSigningIn ? "Signing In..." : "Sign In with Google"}
        </button>
      </p>

      <p className="font-montserrat mt-4 mb-2">
        Don&apos;t have an account?{" "}
        <Link to="/">
          <button className="text-third hover:text-second px-2  underline">
            Sign In
          </button>
        </Link>
      </p>
    </div>
  );
}
