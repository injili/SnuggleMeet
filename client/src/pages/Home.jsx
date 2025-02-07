import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../api/context";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";

export default function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div>
      {!currentUser && <Navigate to={"/"} replace={true} />}
      {currentUser && !currentUser.emailVerified && (
        <Navigate to={"/verification"} replace={true} />
      )}
      <div className="h-full p-4 flex flex-col gap-4 justify-center ">
        <p className="font-alata">
          Welcome to Valediktoria, what room would you like to join?
        </p>
        <div className="grid grid-cols-2 items-center w-full gap-4 justify-between">
          <div className="w-full rounded-xl border border-third">
            <div className="flex justify-between items-center m-4 pb-4 border-b border-third">
              <div className="px-4 py-1 font-montserrat text-first text-xs font-medium rounded-xl bg-third">
                12 participants
              </div>
              <p className="text-xl text-third font-alata">Room A</p>
            </div>
            <div className="flex justify-between items-center m-4">
              <div className="flex gap-4 text-second items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="12" />
                </svg>
                <p className="text-xs py-1 text-third font-medium font-montserrat">
                  injili, tweet, scale, trees ...
                </p>
              </div>
              <button
                onClick={() => {
                  navigate("/room");
                }}
                className="py-1 bg-second rounded-xl text-first text-xs font-montserrat font-semibold font-medium hover:bg-third px-8"
              >
                Join
              </button>
            </div>
          </div>
          <div className="w-full rounded-xl border border-third">
            <div className="flex justify-between items-center m-4 pb-4 border-b border-third">
              <div className="px-4 py-1 font-montserrat text-first text-xs font-medium rounded-xl bg-third">
                4 participants
              </div>
              <p className="text-xl text-third font-alata">Krystal</p>
            </div>
            <div className="flex justify-between items-center m-4">
              <div className="flex gap-4 items-center text-second">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="6"
                  height="6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle cx="12" cy="12" r="12" />
                </svg>
                <p className="text-xs py-1 text-third font-medium font-montserrat">
                  injili, tweet, scale, trees
                </p>
              </div>
              <button className="py-1 bg-second rounded-xl text-xs font-montserrat font-semibold font-medium hover:bg-third px-8 text-first">
                Join
              </button>
            </div>
          </div>
          <div className="w-full rounded-xl bg-third">
            <div className="flex justify-between items-center m-4 pb-4 border-b border-first">
              <div className="px-4 py-1 font-montserrat text-xs font-medium rounded-xl bg-first">
                Full
              </div>
              <p className="text-xl text-first font-alata">Room B</p>
            </div>
            <div className="flex gap-4 items-center text-second m-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="6"
                height="6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="12" />
              </svg>
              <p className="text-xs py-1 text-first font-medium font-montserrat">
                tress, tando, dimple, sweep ...
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 items-center w-full gap-4 justify-between">
          <button className="py-1 w-full rounded-xl text-sm font-montserrat font-semibold hover:bg-third text-first bg-second">
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
}
