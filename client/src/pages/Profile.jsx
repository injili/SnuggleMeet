import { useState } from "react";
import { doPasswordChange } from "../api/auth";
import { auth } from "../api/firebase";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../api/context";
import { doSignOut } from "../api/auth";

import theLogo from "../assets/img/icon.png";

export default function Profile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Attempt to update password using doPasswordChange
      await doPasswordChange(newPassword);
      setSuccessMessage("Password updated successfully.");
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        // Handle re-authentication
        await handleReauthentication();
      } else {
        setErrorMessage("Failed to update password: " + error.message);
      }
    }
  };

  // Function to handle re-authentication if required
  const handleReauthentication = async () => {
    try {
      const credential = EmailAuthProvider.credential(
        auth.currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);
      // Retry password update after successful re-authentication
      await doPasswordChange(newPassword);
      setSuccessMessage("Password updated successfully.");
    } catch (error) {
      setErrorMessage("Re-authentication failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-4 justify-center items-center text-second">
      <Link to="/home" className="absolute left-4 top-4">
        <button className="text-second text-sm font-semibold font-alata px-4 border border-2 bg-third border-second">
          HOME
        </button>
      </Link>
      <Link to="/home">
        <img src={theLogo} alt="our ogo" width={125} height={125} />
      </Link>

      <div className="text-center">
        <h1 className="font-bowldy text-2xl tracking-wide font-extralight">
          {currentUser.displayName
            ? currentUser.displayName
            : currentUser.email}
        </h1>
        <p className="font-alata">Change account password below...</p>
        {errorMessage && <p className="text-red text-sm">{errorMessage}</p>}
        {successMessage && (
          <p className="text-green text-sm">{successMessage}</p>
        )}
      </div>

      <form
        onSubmit={handlePasswordChange}
        className="flex font-alata flex-col items-center justify-center gap-2 w-[200px]"
      >
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="CURRENT PASSWORD"
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="NEW PASSWORD"
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />
        <div className="flex w-full items-center justify-between gap-4">
          <button
            type="submit"
            className="py-1 text-second font-semibold font-alata px-4 border border-2 bg-third border-second"
          >
            CHANGE
          </button>

          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/");
              });
            }}
            className="py-1 text-second font-semibold font-alata px-4 border border-2 bg-third border-second"
          >
            LOG OUT
          </button>
        </div>
      </form>

      <p className="font-alata text-sm">
        Powered by <span className="text-forth">injili.tech</span>
      </p>
    </div>
  );
}
