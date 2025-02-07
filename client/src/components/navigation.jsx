import { Link, useLocation, useNavigate } from "react-router-dom";
import theLogo from "../assets/img/icon.png";
import { useAuth } from "../api/context";
import { doSignOut } from "../api/auth";

export default function Navigation() {
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const checkLocation = () => {
    if (location.pathname === "/") {
      return (
        <h1 className="text-2xl font-montserrat font-semibold ">
          Sign In Page
        </h1>
      );
    } else if (location.pathname === "/signup") {
      return (
        <h1 className="text-3xl font-montserrat font-semibold ">
          Sign Up Page
        </h1>
      );
    } else if (location.pathname === "/home") {
      return (
        <Link to="/profile">
          <h1 className="text-3xl font-montserrat font-semibold ">
            {currentUser.displayName
              ? currentUser.displayName
              : currentUser.email}
          </h1>
        </Link>
      );
    } else if (location.pathname === "/profile") {
      return (
        <div className="flex w-full justify-between">
          <h1 className="text-2xl font-montserrat font-semibold ">
            Your Profile
          </h1>
          <button
            onClick={() => {
              doSignOut().then(() => {
                navigate("/");
              });
            }}
            className="bg-second text-first px-8 py-1 rounded-xl hover:bg-third font-alata"
          >
            Log Out
          </button>
        </div>
      );
    } else if (location.pathname == "/oprofile") {
      return (
        <h1 className="text-2xl font-montserrat font-semibold ">
          View Profile
        </h1>
      );
    }
  };
  return (
    <div className="border-third border-b mx-4 flex items-center gap-4 py-4">
      <Link to="/home">
        <img
          src={theLogo}
          width="50"
          height="50"
          alt="the valediktoria logo"
          className="rounded-md"
        />
      </Link>
      {checkLocation()}
    </div>
  );
}
