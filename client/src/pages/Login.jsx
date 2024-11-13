import { Link } from "react-router-dom";
import theLogo from "../assets/img/snuggle.png";

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center">
      <img src={theLogo} height={120} width={120} />
      <h1 className="font-thin font-bowldy text-3xl my-4 text-second tracking-wide">
        LOGIN PAGE
      </h1>
      <form className="flex font-alata flex-col items-center justify-center gap-2 w-[200px]">
        <input
          type="text"
          placeholder="EMAIL"
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />
        <input
          type="text"
          placeholder="PASSWORD"
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />
        <Link to="/home">
          <button className="py-1 text-second font-semibold font-alata px-4 border border-2 bg-third border-second">
            LOG IN
          </button>
        </Link>
      </form>
      <p className="font-alata">or</p>
      <p className="font-alata">
        Log in with
        <button className="text-forth font-semibold text-lg hover:text-third px-2">
          google
        </button>
      </p>

      <p className="font-alata text-sm mt-4">
        Don&apos;t have an account?{" "}
        <Link to="/signup">
          <button className="text-forth font-semibold hover:text-third px-2">
            Sign Up
          </button>
        </Link>
      </p>
    </div>
  );
}
