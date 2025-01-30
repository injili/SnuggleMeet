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
        <button
          onClick={() => {
            window.location.reload(true);
          }}
          className="p-2 bg-second text-sm rounded-full text-first hover:bg-third"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12.979 3.055c4.508.489 8.021 4.306 8.021 8.945.001 2.698-1.194 5.113-3.075 6.763l-1.633-1.245c1.645-1.282 2.709-3.276 2.708-5.518 0-3.527-2.624-6.445-6.021-6.923v2.923l-5.25-4 5.25-4v3.055zm-1.979 15.865c-3.387-.486-6-3.401-6.001-6.92 0-2.237 1.061-4.228 2.697-5.509l-1.631-1.245c-1.876 1.65-3.066 4.061-3.065 6.754-.001 4.632 3.502 8.444 8 8.942v3.058l5.25-4-5.25-4v2.92z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
