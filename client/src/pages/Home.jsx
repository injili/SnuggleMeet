import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../api/context";
export default function Home() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="">
      {!currentUser && <Navigate to={"/"} replace={true} />}
      {!currentUser.emailVerified && (
        <Navigate to={"/verification"} replace={true} />
      )}
      <div className="h-full p-4 flex flex-col gap-4 justify-center ">
        <p className="font-alata">
          Welcome to SnuggleMeet, what room would you like to join?
        </p>

        <div className="flex items-center w-full gap-4 justify-between">
          <div className="w-full rounded-[15px] bg-second">
            <div className="flex justify-between items-center m-4 pb-4 border-b border-first">
              <div className="px-2 py-1 font-montserrat text-xs font-medium rounded-full bg-first">
                12 participants
              </div>
              <p className="text-xl text-first font-alata">Room A</p>
            </div>
            <div className="flex justify-between items-center m-4">
              <p className="text-xs py-1 text-first font-medium font-montserrat">
                injili, tweet, scale, trees
              </p>
              <button
                onClick={() => {
                  navigate("/room");
                }}
                className="py-1 bg-first rounded-full text-third text-xs font-montserrat font-medium hover:bg-third px-8 hover:text-first "
              >
                Join
              </button>
            </div>
          </div>
          <div className="w-full rounded-[15px] bg-third">
            <div className="flex justify-between items-center m-4 pb-4 border-b border-first">
              <div className="px-2 py-1 font-montserrat text-xs font-medium rounded-full bg-first">
                Full
              </div>
              <p className="text-xl text-first font-alata">Room B</p>
            </div>
            <div className="flex justify-between items-center m-4">
              <p className="text-xs py-1 text-first font-medium font-montserrat">
                tress, tando, dimple, sweep, ...
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center w-full gap-4 justify-between">
          <div className="w-full rounded-[15px] bg-second">
            <div className="flex justify-between items-center m-4 pb-4 border-b border-first">
              <div className="px-2 py-1 font-montserrat text-xs font-medium rounded-full bg-first">
                4 participants
              </div>
              <p className="text-xl text-first font-alata">Kastomaa</p>
            </div>
            <div className="flex justify-between items-center m-4">
              <p className="text-xs py-1 text-first font-medium font-montserrat">
                injili, tweet, scale, trees
              </p>
              <button
                onClick={() => {
                  navigate("/room");
                }}
                className="py-1 bg-first rounded-full text-third text-xs font-montserrat font-medium hover:bg-third px-8 hover:text-first"
              >
                Join
              </button>
            </div>
          </div>
          <div className="w-full rounded-[15px] bg-second">
            <div className="flex justify-between items-center m-4 pb-4 border-b border-first">
              <div className="px-2 py-1 font-montserrat text-xs font-medium rounded-full bg-first">
                10 participants
              </div>
              <p className="text-xl text-first font-alata">Kristals</p>
            </div>
            <div className="flex justify-between items-center m-4">
              <p className="text-xs py-1 text-first font-medium font-montserrat">
                injili, tweet, scale, trees
              </p>
              <button
                onClick={() => {
                  navigate("/room");
                }}
                className="py-1 bg-first rounded-full text-third text-xs font-montserrat font-medium hover:bg-third px-8 hover:text-first"
              >
                Join
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            navigate("/room");
          }}
          className="py-1 w-2/6 flex items-center justify-center gap-2 bg-first rounded-full text-third text-sm font-montserrat font-semibold hover:bg-third hover:text-first border border-2 border-third"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z" />
          </svg>
          Create Room
        </button>
      </div>
    </div>
  );
}
