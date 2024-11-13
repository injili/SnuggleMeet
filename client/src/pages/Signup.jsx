import { Link } from "react-router-dom";
import theLogo from "../assets/img/snuggle.png";

export default function Signup() {
  return (
    <div className="min-h-screen flex flex-col gap-2 items-center justify-center">
      <img src={theLogo} height={120} width={120} />
      <h1 className="font-thin font-bowldy text-3xl my-4 text-second tracking-wide">
        SIGNUP PAGE
      </h1>
      <form className="flex font-alata flex-col items-center justify-center gap-2 w-[200px]">
        <input
          type="text"
          placeholder="USERNAME"
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />
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
            SIGN UP
          </button>
        </Link>
      </form>
      <p className="font-alata">or</p>
      <p className="font-alata">
        Sign up with
        <button className="text-forth font-semibold text-lg hover:text-third px-2">
          google
        </button>
      </p>

      <p className="font-alata text-sm mt-4">
        Already Have an account?{" "}
        <Link to="/">
          <button className="text-forth font-semibold hover:text-third px-2">
            Log in
          </button>
        </Link>
      </p>
    </div>
  );
}
