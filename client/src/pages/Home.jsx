import theLogo from "../assets/img/icon.png";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../api/context";
import { doSignOut } from "../api/auth";

export default function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  return (
    <div className="min-h-screen">
      {!currentUser && <Navigate to={"/"} replace={true} />}
      <div className="h-full p-8 flex flex-col gap-8 justify-center items-center">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <img
              src={theLogo}
              alt="our logo snugglemeet"
              height={39}
              width={39}
            />
            <Link to="/profile">
              <h1 className="font-bowldy font-thin text-second tracking-wide text-2xl">
                {currentUser.displayName
                  ? currentUser.displayName
                  : currentUser.email}
              </h1>
            </Link>
          </div>
          <div>
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
        </div>
        <p className="font-alata">
          Welcome to SnuggleMeet, what room would you like to join?
        </p>
        <div className="flex items-center w-full gap-12 justify-between">
          <Link
            to="/room"
            className="w-full font-bowldy text-4xl text-second aspect-square border-2 border-second bg-third p-2 flex justify-center"
          >
            <button>ROOM A</button>
          </Link>

          <button className="w-full font-bowldy text-4xl text-second aspect-square border-2 border-second bg-third p-2">
            ROOM B
          </button>
        </div>
        <p className="font-alata text-sm">
          Powered by <span className="text-forth">injili.tech</span>
        </p>
      </div>
    </div>
  );
}
