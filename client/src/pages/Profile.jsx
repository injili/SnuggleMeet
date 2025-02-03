import { useState } from "react";
import { doPasswordChange } from "../api/auth";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

import theProfile from "../assets/img/pp.jpg";
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
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newUsername, setNewUsername] = useState("");

  // Dialog Panel Variables
  const [title, setTitle] = useState("");

  const navigate = useNavigate();
  const { currentUser } = useAuth();

  function handleClose() {
    setErrorMessage("");
    setSuccessMessage("");
  }

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

  // Dialog Panel Functions
  const editProfile = (e) => {
    if (e === "edit") {
      setEdit(true);
    }
    setTitle("Edit Profile");
    setIsOpen(true);
  };

  const renderForm = () => {
    return (
      <div>
        <Description>Modify your Profile.</Description>
        <form action="">
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            placeholder="New Username"
            className="w-full py-1 px-4 border border-2 border-third bg-first border-first rounded-full placeholder-third"
          />
        </form>
        <button className="flex items-center justify-center gap-2 bg-first border border-2 border-third font-montserrat font-semibold py-1 px-8 mt-1 rounded-full hover:bg-first hover:text-third ">
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M23 0v20h-8v-2h6v-16h-18v16h6v2h-8v-20h22zm-12 13h-4l5-6 5 6h-4v11h-2v-11z" />
          </svg>
          Upload New Photo
        </button>
        <Description>Commit your changes below.</Description>
      </div>
    );
  };

  const closeDialog = () => {
    setTitle("");
    setIsOpen(false);
    setEdit(false);
  };

  return (
    <div className=" flex flex-col gap-4 justify-center px-4 items-center">
      <div className="w-full grid grid-cols-2 gap-4 ">
        <div className="flex flex-col gap-4 justify-start">
          <div className="w-full rounded-[15px] bg-first border border-2 border-third">
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-4">
                <img
                  src={theProfile}
                  width="35"
                  height="35"
                  alt="the valediktoria logo"
                  className="rounded-full"
                />
                <div className=" text-third font-montserrat font-semibold font-medium rounded-full bg-first">
                  {currentUser.displayName
                    ? currentUser.displayName
                    : currentUser.email}
                </div>
              </div>

              <button
                onClick={() => editProfile("edit")}
                className="text-third hover:text-second text-semibold"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
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

                    {edit && renderForm()}

                    <div className="flex gap-4">
                      <button
                        onClick={() => closeDialog()}
                        className="bg-first border border-2 border-third font-semibold px-4 rounded-full hover:bg-third hover:text-first text-sm"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => closeDialog()}
                        className="bg-first border border-2 border-third font-semibold py-1 px-4 rounded-full hover:bg-third hover:text-first text-sm"
                      >
                        Save
                      </button>
                    </div>
                  </DialogPanel>
                </div>
              </Dialog>
            </div>
          </div>
          <div className="w-full rounded-[15px] bg-first border border-2 border-third">
            <div className="flex justify-between items-center m-4 pb-4 border-b-2 border-third">
              <div className="font-montserrat text-sm font-semibold text-third ">
                Nyareki Gospel
              </div>
              <p className="text-xs text-first px-2 py-1 font-montserrat font-medium bg-second rounded-full">
                verified
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
          <div className="w-full rounded-[15px] bg-first border border-2 border-third">
            <div className="flex justify-between items-center m-4 pb-4 border-b-2 border-third">
              <div className="font-montserrat text-sm font-semibold text-third ">
                Bio
              </div>
              <p className="text-xs text-first px-2 py-1 font-montserrat font-medium bg-second rounded-full">
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
          <div className="w-full rounded-[15px] bg-first border border-2 border-third">
            <div className="flex justify-between items-center p-4">
              <p className="font-montserrat text-sm font-semibold text-third ">
                Stats
              </p>
              <div className="flex items-center gap-4">
                <div className="flex justify-center gap-1 items-center">
                  <div className="text-second">
                    <svg
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z" />
                    </svg>
                  </div>
                  <p className="font-montserrat font-semibold text-sm text-center">
                    122
                  </p>
                </div>
                <div className="flex justify-center gap-1 items-center">
                  <div className="text-second">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="17"
                      height="17"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M18.926 5.722c-.482 1.41-.484 1.139 0 2.555.051.147.074.297.074.445 0 .449-.222.883-.615 1.156-1.256.87-1.09.651-1.562 2.067-.198.591-.77.99-1.414.99h-.004c-1.549-.005-1.279-.088-2.528.789-.262.184-.569.276-.877.276s-.615-.092-.876-.275c-1.249-.878-.98-.794-2.528-.789h-.004c-.645 0-1.216-.399-1.413-.99-.473-1.417-.311-1.198-1.562-2.067-.395-.274-.617-.708-.617-1.157 0-.148.024-.298.074-.444.483-1.411.484-1.139 0-2.555-.05-.147-.074-.297-.074-.445 0-.45.222-.883.616-1.157 1.251-.868 1.089-.648 1.562-2.067.197-.591.769-.99 1.413-.99h.004c1.545.005 1.271.095 2.528-.79.262-.183.569-.274.877-.274s.615.091.876.274c1.249.878.98.795 2.528.79h.004c.645 0 1.216.399 1.414.99.473 1.416.307 1.197 1.562 2.067.394.273.616.707.616 1.156 0 .148-.023.299-.074.445zm-2.926 1.278c0-2.209-1.791-4-4-4s-4 1.791-4 4 1.791 4 4 4 4-1.792 4-4zm-4 9c-1.156 0-1.707-.418-2.537-1h-1.463v9l4.042-3 3.958 3v-9h-1.5c-.62.585-1.525 1-2.5 1z" />
                    </svg>
                  </div>
                  <p className="font-montserrat font-semibold text-sm text-center">
                    122
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full rounded-[15px] bg-first border border-2 border-third">
            <div className="flex justify-between items-center p-4">
              <p className="font-montserrat text-sm font-semibold text-third ">
                Friend Requests
              </p>
              <p className="bg-second py-1 px-2 font-montserrattext-xs text-first rounded-full">
                0
              </p>
            </div>
          </div>
          <div className="w-full rounded-[15px] bg-first border border-2 border-third">
            <div className="flex justify-between items-center p-4">
              <p className="font-montserrat text-sm font-semibold text-third ">
                Friends
              </p>
              <p className="bg-second py-1 px-2 font-montserrat text-xs text-first rounded-full">
                14
              </p>
            </div>
          </div>
          <div className="w-full rounded-[15px] bg-first border border-2 border-third">
            <div className="flex justify-between items-center p-4">
              <p className="font-montserrat text-sm font-semibold text-third ">
                Attended Sessions
              </p>
              <div className="flex justify-center gap-1 items-center">
                <div className="text-second">
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
          </div>
          <div className="w-full rounded-[15px] bg-first border border-2 border-third">
            <div className="flex justify-between items-center p-4">
              <p className="font-montserrat text-sm font-semibold text-third ">
                Change Password
              </p>
            </div>
          </div>
          <div className="w-full rounded-[15px] bg-first border border-2 border-third">
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
          </div>
        </div>
      </div>
    </div>
  );
}
