import { useState, useEffect } from "react";
import {
  checkAuthProvider,
  doPasswordChange,
  deleteAccount,
  checkText,
} from "../api/auth";
import { changeBio, checkUserName } from "../api/userinfo";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { updateProfile } from "firebase/auth";
import theProfile from "../assets/img/pp.jpg";
import { auth } from "../api/firebase";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { useAuth } from "../api/context";
import { Navigate } from "react-router-dom";

export default function Profile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [stats, setStats] = useState(false);
  const [streak, setStreak] = useState("78");
  const [newUsername, setNewUsername] = useState("");
  const [newBio, setNewBio] = useState("");
  const [Leaderboard, setLeaderboard] = useState("2");
  const [friends, setFriends] = useState(false);
  const [sessions, setSessions] = useState(false);
  const [requests, setRequests] = useState(false);
  const [password, setPassword] = useState(false);
  const [deletion, setDeletion] = useState(false);
  const [isPassword, setIsPassword] = useState(true);
  const [deletionText, setDeletionText] = useState("");
  const [isBorder, setIsBorder] = useState(false);

  // errors
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Dialog Panel Variables
  const [title, setTitle] = useState("");

  const user = auth.currentUser;

  const { currentUser } = useAuth();

  const handleClose = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setNewPassword("");
    setCurrentPassword("");
    setIsOpen(false);
  };

  useEffect(() => {
    setIsPassword(checkAuthProvider());
  }, []);

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (isBorder) {
      return await deleteAccount(currentPassword);
    } else {
      setErrorMessage("Please try again.");
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Attempt to update password using doPasswordChange
      await doPasswordChange(newPassword);
      setSuccessMessage("Password updated successfully.");
      closeDialog();
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        // Handle re-authentication
        await handleReauthentication();
      } else {
        setPasswordError(true);
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

  // Dialog Panel Functions
  const renderContent = (e) => {
    if (e === "edit") {
      setEdit(true);
      setTitle("Edit Profile");
    } else if (e === "stats") {
      setStats(true);
      setTitle("View Stats");
    } else if (e === "requests") {
      setTitle("Friend Requests");
      setRequests(true);
    } else if (e === "friends") {
      setTitle("Friends");
      setFriends(true);
    } else if (e === "sessions") {
      setTitle("Attended Sessions");
      setSessions(true);
    } else if (e === "password") {
      setTitle("Change Password");
      setPassword(true);
    } else if (e === "delete") {
      setTitle("Delete Account");
      setDeletion(true);
    }
    setIsOpen(true);
  };

  const checkUsernameFunction = async (thename) => {
    const e = await checkUserName(thename);
    setUsernameError(!e);
  };

  const renderUser = () => {
    return (
      <div className="flex flex-col gap-4">
        <Description>Modify your Profile.</Description>
        <form>
          {usernameError && (
            <span className="text-red-600 text-sm">
              This username is not available.
            </span>
          )}
          <input
            type="text"
            pattern="[^ ]+"
            value={newUsername}
            onChange={(e) => {
              const thename = e.target.value;
              setNewUsername(thename);
              checkUsernameFunction(thename);
            }}
            placeholder="New Username"
            className="w-full py-1 px-2 border border-third bg-first border-first rounded-xl placeholder-third"
          />
        </form>
        <form>
          <textarea
            rows="5"
            value={newBio}
            onChange={(e) => setNewBio(e.target.value)}
            placeholder="Bio"
            className="h-24 w-full py-1 px-2 border border-third bg-first border-first rounded-xl placeholder-third"
          />
        </form>
        <button className="flex items-center justify-center gap-2 bg-second text-first font-alata py-1 px-8 rounded-xl hover:bg-third">
          Upload New Photo
        </button>
        <Description>Commit your changes below.</Description>
        <div className="flex gap-4">
          <button
            onClick={() => closeDialog()}
            className="bg-second font-alata px-8 rounded-xl hover:bg-third text-first"
          >
            Cancel
          </button>
          <button
            onClick={() => changeProfile()}
            className="bg-second font-alata py-1 px-8 rounded-xl hover:bg-third text-first"
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  };

  const renderStats = () => {
    return (
      <div className="flex flex-col gap-4 font-montserrat">
        <div>
          <p>
            Streak: <span className="font-semibold">{streak}</span>
          </p>
          <p>
            Leaderboard Position:{" "}
            <span className="font-semibold">{Leaderboard}</span>
          </p>
        </div>
        <div className="flex">
          <button
            onClick={() => closeDialog()}
            className="bg-second font-semibold py-1 px-8 rounded-xl hover:bg-third text-first text-sm"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const renderRequests = () => {
    return (
      <div className="flex flex-col gap-4">
        <ul>
          <li>
            <span>Name Here </span>
            <button className="ml-4 px-4 bg-second py-1 rounded-xl hover:bg-third font-alata text-first text-sm">
              accept request
            </button>
          </li>
        </ul>
        <div className="flex">
          <button
            onClick={() => closeDialog()}
            className="bg-second font-alata py-1 px-8 rounded-xl hover:bg-third text-first text-sm"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const renderFriends = () => {
    return (
      <div className="flex flex-col gap-4">
        <ul>
          <li>
            <span>Name Here </span>
            <button className="font-alata ml-4 py-1 px-4 bg-second rounded-xl hover:bg-third text-first text-sm">
              unfriend
            </button>
          </li>
        </ul>
        <div className="flex">
          <button
            onClick={() => closeDialog()}
            className="bg-second py-1 px-8 font-alata rounded-xl hover:bg-third text-first text-sm"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const renderSessions = () => {
    return (
      <div className="flex flex-col gap-4">
        <ul>
          <li className="flex gap-2">
            <span>18th Jan, 2025</span>
            <span>11:14:17</span>
            <span>to</span>
            <span>12:32:16</span>
          </li>
          <li className="flex gap-2">
            <span>18th Jan, 2025</span>
            <span>10:10:37</span>
            <span>to</span>
            <span>12:42:06</span>
          </li>
        </ul>
        <div className="flex">
          <button
            onClick={() => closeDialog()}
            className="bg-second py-1 px-8 font-alata rounded-xl hover:bg-third text-first text-sm"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const renderPassword = () => {
    return (
      <div className="flex flex-col gap-4">
        <Description>Change your Password here.</Description>
        <form className="flex flex-col gap-4" onSubmit={handlePasswordChange}>
          {passwordError && (
            <span className="text-red-600 text-sm">Incorrect Password.</span>
          )}
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Old Password"
            className="w-full py-1 px-4 border border-third bg-first border-first rounded-xl placeholder-third"
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full py-1 px-4 border border-third bg-first border-first rounded-xl placeholder-third"
          />
          <div className="flex gap-4">
            <button
              onClick={() => closeDialog()}
              className="bg-second font-alata py-1 px-8 rounded-xl hover:bg-third text-first text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-second font-alata py-1 px-8 rounded-xl hover:bg-third text-first text-sm"
            >
              Change
            </button>
          </div>
        </form>
        <Description>Commit your changes below.</Description>
      </div>
    );
  };

  const renderDelete = () => {
    return (
      <div>
        <Description>
          Type in your password and the text below on the space to delete
          account.
        </Description>
        <form
          className="flex flex-col mt-2 gap-2"
          onSubmit={handleDeleteAccount}
        >
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder="Type in your password."
            className="w-full py-1 px-4 border border-third bg-first border-first rounded-xl placeholder-third"
          />
          <p
            className={`font-bold ${
              isBorder ? "text-green-500" : "text-red-500"
            }`}
          >
            I want to delete my account under username {currentUser.displayName}
          </p>
          <input
            type="text"
            value={deletionText}
            onChange={(e) => {
              const t = e.target.value;
              setIsBorder(checkText(t, currentUser.displayName));
              setDeletionText(t);
            }}
            className={`w-full py-1 px-4 border ${
              isBorder
                ? "border-green-500 active:ring-green-500 focus:ring-green-500"
                : "border-red-500"
            } bg-first rounded-xl`}
          />
          <div className="flex gap-4">
            <button
              onClick={() => closeDialog()}
              className="bg-first border border-third font-semibold px-8 rounded-xl hover:bg-third hover:text-first text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-first border border-third font-semibold py-1 px-8 rounded-xl hover:bg-red-500 hover:border-red-500 hover:text-first text-sm"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    );
  };

  const whatToRender = () => {
    if (edit) {
      return renderUser();
    } else if (stats) {
      return renderStats();
    } else if (requests) {
      return renderRequests();
    } else if (friends) {
      return renderFriends();
    } else if (sessions) {
      return renderSessions();
    } else if (password) {
      return renderPassword();
    } else if (deletion) {
      return renderDelete();
    }
  };

  const closeDialog = () => {
    setTitle("");
    setIsOpen(false);
    setEdit(false);
    setStats(false);
    setRequests(false);
    setFriends(false);
    setSessions(false);
    setPassword(false);
    setDeletion(false);
  };

  const changeProfile = async () => {
    try {
      if (newUsername !== "" && !usernameError) {
        await updateProfile(user, {
          displayName: newUsername,
        });
      }
      if (newBio !== "") {
        changeBio(currentUser.uid, newBio);
      }
      closeDialog();
      window.location.reload();
    } catch (error) {
      console.log("The error", error);
    }
  };

  return (
    <div className=" z-60 flex flex-col gap-4 justify-center px-4 items-center">
      {!currentUser && <Navigate to={"/"} replace={true} />}
      {!currentUser.emailVerified && (
        <Navigate to={"/verification"} replace={true} />
      )}
      {errorMessage && (
        <div
          role="alert"
          className=" absolute rounded-lg top-4 right-4 bg-second p-2"
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
              <p className="text-first text-sm">{errorMessage}</p>
            </div>

            <button
              onClick={handleClose}
              className="text-first transition hover:text-fifth"
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
      {successMessage && (
        <div
          role="alert"
          className="z-60 absolute border border-fifth top-4 right-4 bg-second p-2"
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
              <p className="text-first font-alata text-sm">{successMessage}</p>
            </div>

            <button
              onClick={handleClose}
              className="text-first transition hover:text-forth"
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
      <div className="w-full grid grid-cols-2 gap-4 ">
        <div className="flex flex-col gap-4 justify-start">
          <div className="w-full rounded-[15px] bg-first border border-third">
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-4">
                <img
                  src={theProfile}
                  width="35"
                  height="35"
                  alt="the valediktoria logo"
                  className="rounded-xl"
                />
                <div className=" text-third font-montserrat font-semibold font-medium rounded-xl bg-first">
                  {currentUser.displayName
                    ? currentUser.displayName
                    : currentUser.email}
                </div>
              </div>

              <button
                onClick={() => renderContent("edit")}
                className="text-second hover:text-second text-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z" />
                </svg>
              </button>
              <Dialog
                open={isOpen}
                onClose={() => closeDialog()}
                className="relative z-50"
              >
                <div className="fixed inset-0 z-10 flex w-screen items-center justify-center p-4 bg-opacity-70 bg-blur-2xl bg-third">
                  <DialogPanel className="font-montserrat w-full max-w-lg space-y-4 bg-first text-third p-8 rounded-[15px]">
                    <DialogTitle className="font-semibold font-montserrat text-xl">
                      {title}
                    </DialogTitle>

                    {whatToRender()}
                  </DialogPanel>
                </div>
              </Dialog>
            </div>
          </div>
          <div className="w-full rounded-[15px] bg-first border border-third">
            <div className="flex justify-between items-center m-4 pb-4 border-b border-third">
              <div className="font-montserrat text-sm font-semibold text-third ">
                Nyareki Gospel
              </div>
              <p className="text-xs text-first px-2 py-1 font-alata font-medium bg-third rounded-xl">
                {currentUser.emailVerified ? "verified" : "not verified"}
              </p>
            </div>
            <div className="flex-col justify-start items-end px-4 pb-4">
              <p className="text-xs text-third font-medium font-montserrat">
                Date Of Birth: 24th, June, 2000
              </p>
              <p className="text-xs py-1 text-third font-medium font-montserrat">
                Email Address: petertimber@gmail.com
              </p>
            </div>
          </div>
          <div className="w-full rounded-[15px] bg-first border border-third">
            <div className="flex justify-between items-center m-4 pb-4 border-b border-third">
              <div className="font-montserrat text-sm font-semibold text-third ">
                Bio
              </div>
              <p className="text-xs text-first px-2 py-1 font-montserrat font-medium bg-third rounded-xl">
                Pharmacist
              </p>
            </div>
            <div className="flex-col justify-start items-end px-4 pb-4">
              <p className="text-xs text-third font-medium font-montserrat">
                Over here we are going to write a long ass bio that expresses
                everything that y&apos;all need to know and maybe more that
                y&apos;all don&apos;t need to know yk, and that is all.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-start">
          <button
            onClick={() => renderContent("stats")}
            className="w-full rounded-[15px] bg-first border border-third"
          >
            <div className="flex justify-between items-center p-4">
              <p className="font-montserrat text-sm font-semibold text-third ">
                Stats
              </p>
              <div className="flex items-center gap-4">
                <div className="flex flex-col justify-center gap-1 items-center">
                  <div className="text-second">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z" />
                    </svg>
                  </div>
                  <p className="font-montserrat font-semibold text-sm text-center">
                    {streak}
                  </p>
                </div>
                <div className="flex flex-col justify-center gap-1 items-center">
                  <div className="text-second">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.892 6.005c-.698 6.474-4.58 10.865-6.892 12.945v-14.95c2.182 0 4.781.769 6.892 2.005zm4.108-2.005c0 8.578-5.071 16.1-11 20-5.929-3.9-11-11.422-11-20 2.828-2.329 7.162-4 11-4 3.847 0 8.172 1.671 11 4zm-2.023.971c-2.544-1.8-6.035-2.971-8.977-2.971s-6.433 1.171-8.977 2.971c.356 7.492 4.783 13.384 8.977 16.578 4.194-3.194 8.621-9.086 8.977-16.578z" />
                    </svg>
                  </div>
                  <p className="font-montserrat font-semibold text-sm text-center">
                    {Leaderboard}
                  </p>
                </div>
              </div>
            </div>
          </button>
          <button
            onClick={() => renderContent("requests")}
            className="w-full rounded-[15px] bg-first border border-third"
          >
            <div className="flex justify-between items-center p-4">
              <p className="font-montserrat text-sm font-semibold text-third ">
                Friend Requests
              </p>
              <p className="bg-third py-1 px-2 font-montserrat text-xs text-first rounded-xl">
                0
              </p>
            </div>
          </button>
          <button
            onClick={() => renderContent("friends")}
            className="w-full rounded-[15px] bg-first border border-third"
          >
            <div className="flex justify-between items-center p-4">
              <p className="font-montserrat text-sm font-semibold text-third ">
                Friends
              </p>
              <p className="bg-third py-1 px-2 font-montserrat text-xs text-first rounded-xl">
                14
              </p>
            </div>
          </button>
          <button
            onClick={() => {
              renderContent("sessions");
            }}
            className="w-full rounded-[15px] bg-first border border-third"
          >
            <div className="flex justify-between items-center p-4">
              <p className="font-montserrat text-sm font-semibold text-third ">
                Attended Sessions
              </p>
              <div className="flex justify-center gap-2 items-center">
                <div className="text-third">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M16 18c0 1.104-.896 2-2 2h-12c-1.105 0-2-.896-2-2v-12c0-1.104.895-2 2-2h12c1.104 0 2 .896 2 2v12zm8-14l-6 6.223v3.554l6 6.223v-16z" />
                  </svg>
                </div>
                <p className="font-montserrat font-semibold text-sm text-center">
                  14
                </p>
              </div>
            </div>
          </button>
          {isPassword && (
            <button
              onClick={() => renderContent("password")}
              className="w-full rounded-[15px] bg-first border border-third"
            >
              <div className="flex justify-between items-center p-4">
                <p className="font-montserrat text-sm font-semibold text-third ">
                  Change Password
                </p>
              </div>
            </button>
          )}
          {/* <button
            onClick={() => renderContent("delete")}
            className="w-full rounded-[15px] bg-first border border-third"
          >
            <div className="flex justify-between items-center p-4">
              <p className="font-montserrat text-sm font-semibold text-third ">
                Delete Account
              </p>
              <div className="text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19 24h-14c-1.104 0-2-.896-2-2v-17h-1v-2h6v-1.5c0-.827.673-1.5 1.5-1.5h5c.825 0 1.5.671 1.5 1.5v1.5h6v2h-1v17c0 1.104-.896 2-2 2zm0-19h-14v16.5c0 .276.224.5.5.5h13c.276 0 .5-.224.5-.5v-16.5zm-9 4c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm6 0c0-.552-.448-1-1-1s-1 .448-1 1v9c0 .552.448 1 1 1s1-.448 1-1v-9zm-2-7h-4v1h4v-1z" />
                </svg>
              </div>
            </div>
          </button> */}
        </div>
      </div>
    </div>
  );
}
