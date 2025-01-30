import { useLocation } from "react-router-dom";
import theLogo from "../assets/img/icon.png";
import { useAuth } from "../api/context";

export default function Navigation() {
  const { currentUser } = useAuth();
  const location = useLocation();

  const checkLocation = () => {
    if (location.pathname === "/") {
      return <h1 className="text-2xl font-alata ">Sign In Page</h1>;
    } else if (location.pathname === "/signup") {
      return <h1 className="text-3xl font-alata ">Sign Up Page</h1>;
    } else if (location.pathname === "/home") {
      return (
        <h1 className="text-3xl font-alata ">
          {currentUser.displayName
            ? currentUser.displayName
            : currentUser.email}
        </h1>
      );
    }
  };
  return (
    <div className="border-third border-b-2 mx-4 flex items-center gap-4 py-4">
      <img
        src={theLogo}
        width="65"
        height="65"
        alt="the valediktoria logo"
        className="rounded-md"
      />
      {checkLocation()}
    </div>
  );
}
