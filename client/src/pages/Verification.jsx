import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../api/context";
import { doSendEmailVerification, doSignOut } from "../api/auth";
import { useState } from "react";
export default function Verification() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [buttonColor, setButtonColor] = useState("bg-second hover:bg-third");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleclick = () => {
    setIsDisabled(true);
    setButtonColor("bg-third");
    doSendEmailVerification();

    setTimeout(() => {
      setIsDisabled(false);
      setButtonColor("bg-second hover:bg-third");
      window.location.reload(true);
    }, 120000);
  };

  if (!currentUser) {
    return <Navigate to={"/"} replace={true} />;
  } else if (currentUser.emailVerified) {
    return <Navigate to={"/home"} replace={true} />;
  }
  return (
    <div className="flex flex-col justify-center items-center p-4 gap-8">
      <p className="text-center">
        A verification email will be sent to {currentUser.email}. Please verify
        and this refresh page.
      </p>
      <div className="flex justify-center items-center w-full gap-4">
        <button
          disabled={isDisabled}
          onClick={() => {
            handleclick();
          }}
          className={`py-2 text-sm rounded-full text-first px-16 ${buttonColor} `}
        >
          {isDisabled ? <p>Email Sent</p> : <p>Send Email</p>}
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
    </div>
  );
}
