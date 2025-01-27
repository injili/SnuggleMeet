import { useLocation } from "react-router-dom";
import theLogo from "../assets/img/icon.png";

export default function Navigation() {
  const location = useLocation();
  return (
    <div className="border-third border-b-2 mx-4 flex items-center gap-4 py-4">
      <img
        src={theLogo}
        width="65"
        height="65"
        alt="the valediktoria logo"
        className="rounded-md"
      />
      <h1 className="text-2xl font-alata ">Sign In Page</h1>
    </div>
  );
}
