import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../api/context";
import { doSendEmailVerification, doSignOut } from "../api/auth";
export default function Verification() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    return <Navigate to={"/"} replace={true} />;
  } else if (currentUser.emailVerified) {
    return <Navigate to={"/home"} replace={true} />;
  }
  return (
    <div className="flex flex-col justify-center items-center p-4 gap-8">
      <p className="">
        A verification email will be sent to {currentUser.email}. Please verify
        and this refresh page.
      </p>
      <button
        onClick={() => {
          doSendEmailVerification();
        }}
        className="py-2 bg-second text-sm rounded-full text-first hover:bg-third px-16 "
      >
        Send Email
      </button>

      <button
        onClick={() => {
          doSignOut().then(() => {
            navigate("/");
          });
        }}
        className="py-2 bg-second text-sm rounded-full text-first hover:bg-third px-16 "
      >
        Log Out
      </button>
    </div>
  );
}
