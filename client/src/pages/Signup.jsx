import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../api/context";
import { getMaxDate } from "../api/utilities";
import {
  doSignInWithGoogle,
  doCreateUserWithEmailAndPassword,
} from "../api/auth";
import { createUserProfile, checkUserName } from "../api/userinfo";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmationPasswordError, setConfirmationPasswordError] =
    useState(false);
  const [termsError, setTermsError] = useState(false);
  const [privacyError, setPrivacyError] = useState(false);
  const { userLoggedIn } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const [privacyPolicy, setPrivacyPolicy] = useState(false);

  const profileDetails = async (a) => {
    try {
      await createUserProfile(
        firstName,
        lastName,
        userName,
        dateOfBirth,
        termsAndConditions,
        privacyPolicy,
        a
      );
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      !isRegistering &&
      !passwordError &&
      !confirmationPasswordError &&
      !usernameError &&
      !emailError
    ) {
      if (termsAndConditions) {
        if (privacyPolicy) {
          setIsRegistering(true);
          try {
            const a = await doCreateUserWithEmailAndPassword(
              email,
              password,
              userName
            );
            profileDetails(a);
          } catch (error) {
            setErrorMessage(
              error.message || "An error occurred. Please try again."
            );
          } finally {
            setIsRegistering(false);
          }
        } else {
          setPrivacyError(true);
        }
      } else {
        setTermsError(true);
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

  const checkUsernameFunction = async (thename) => {
    const e = await checkUserName(thename);
    setUsernameError(!e);
  };

  const checkEmail = (theemail) => {
    const validEmail = /^\S+@\S+\.\S+$/;
    if (theemail !== "") {
      setEmailError(!validEmail.test(theemail));
    } else {
      setEmailError(false);
    }
  };
  const checkPassword = (thePassword) => {
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (thePassword !== "") {
      setPasswordError(!strongPasswordRegex.test(thePassword));
    } else {
      setPasswordError(false);
    }
  };

  const checkSimilarity = (confirmationPassword) => {
    if (confirmationPassword !== "") {
      setConfirmationPasswordError(confirmationPassword !== password);
    } else {
      setConfirmationPasswordError(false);
    }
  };
  return (
    <div className="flex flex-col gap-2 justify-center px-4">
      {userLoggedIn && <Navigate to={"/verification"} replace={true} />}
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
            pattern="[^ ]+"
            required
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
            minLength={2}
            max={25}
            placeholder="First Name"
            className="w-full py-1 px-4 border bg-first border-third rounded-xl"
          />
          <input
            type="text"
            pattern="[^ ]+"
            required
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
            minLength={2}
            max={25}
            placeholder="Last Name"
            className="w-full py-1 px-4 border bg-first border-third rounded-xl"
          />
        </div>
        {usernameError && (
          <span className="text-red-600 text-sm">
            This username is not available.
          </span>
        )}
        {emailError && (
          <span className="text-red-600 text-sm">
            The email is invalid and might have spaces.
          </span>
        )}
        <div className="flex w-full gap-2 items-center justify-center">
          <input
            type="text"
            pattern="[^ ]+"
            required
            value={userName}
            onChange={(e) => {
              const thename = e.target.value;
              setUserName(thename);
              checkUsernameFunction(thename);
            }}
            minLength={2}
            max={25}
            placeholder="Username"
            className="w-full py-1 px-4 border bg-first border-third rounded-xl"
          />
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => {
              const t = e.target.value;
              setEmail(t);
              checkEmail(t);
            }}
            placeholder="Email Address"
            className="w-full py-1 px-4 border bg-first border-third rounded-xl"
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
          max={getMaxDate()}
          className="w-1/2 py-1 px-4 border bg-first border-third rounded-xl"
        />
        {passwordError && (
          <span className="text-red-600 text-sm">
            This password is too weak.
          </span>
        )}
        {confirmationPasswordError && (
          <span className="text-red-600 text-sm">
            This passwords are not similar.
          </span>
        )}
        <div className="flex w-full gap-2 items-center justify-center">
          <input
            disabled={isRegistering}
            type="password"
            required
            autoComplete="new-password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              const p = e.target.value;
              setPassword(p);
              checkPassword(p);
            }}
            className="w-full py-1 px-4 border bg-first border-third rounded-xl"
          />

          <input
            disabled={isRegistering}
            type="password"
            autoComplete="off"
            required
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => {
              const p = e.target.value;
              setconfirmPassword(p);
              checkSimilarity(p);
            }}
            className="w-full py-1 px-4 border bg-first border-third rounded-xl"
          />
        </div>

        {termsError && (
          <span className="text-red-600 text-sm">
            Check the Terms and Conditions.
          </span>
        )}
        {privacyError && (
          <span className="text-red-600 text-sm">
            Check the Privacy Policy.
          </span>
        )}
        <div className="flex w-full gap-8 items-center text-sm py-2">
          <label>
            <input
              type="checkbox"
              required
              checked={termsAndConditions}
              onChange={(e) => {
                const c = e.target.checked;
                setTermsAndConditions(c);
                setTermsError(!c);
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
              required
              checked={privacyPolicy}
              onChange={(e) => {
                const c = e.target.checked;
                setPrivacyPolicy(c);
                setPrivacyError(!c);
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
          className="text-first font-alata py-2 px-16 bg-second hover:bg-third rounded-xl w-max text-sm"
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
          className="py-2 bg-second text-sm rounded-xl text-first hover:bg-third px-16 "
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
