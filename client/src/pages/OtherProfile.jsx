import { useState } from "react";
import { doPasswordChange } from "../api/auth";

import theProfile from "../assets/img/pp.jpg";
import { auth } from "../api/firebase";
import { reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../api/context";
import { doSignOut } from "../api/auth";

import theLogo from "../assets/img/icon.png";

export default function OtherProfile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

              <button className="text-third text-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z" />
                </svg>
              </button>
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
                Current Room
              </p>
              <p className="bg-second py-1 px-2 font-montserrat text-xs text-first rounded-full">
                Powder
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
