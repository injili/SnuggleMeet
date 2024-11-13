import theLogo from "../assets/img/icon.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../api/context";
import { doSignOut } from "../api/auth";

export default function Profile() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
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
      </div>

      <form className="flex font-alata flex-col items-center justify-center gap-2 w-[200px]">
        <input
          type="text"
          placeholder="OLD PASSWORD"
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />
        <input
          type="text"
          placeholder="NEW PASSWORD"
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />
      </form>

      <div className="flex items-center gap-4">
        <button className="py-1 text-second font-semibold font-alata px-4 border border-2 bg-third border-second">
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

      <p className="font-alata text-sm">
        Powered by <span className="text-forth">injili.tech</span>
      </p>
    </div>
  );
}
