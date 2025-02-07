import theProfile from "../assets/img/pp.jpg";
import { Navigate } from "react-router-dom";
import { useAuth } from "../api/context";

export default function OtherProfile() {
  const { currentUser } = useAuth();

  return (
    <div className=" flex flex-col gap-4 justify-center px-4 items-center">
      {!currentUser && <Navigate to={"/"} replace={true} />}
      {!currentUser.emailVerified && (
        <Navigate to={"/verification"} replace={true} />
      )}
      <div className="w-full rounded-[15px] bg-first border border-third">
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-4">
            <img
              src={theProfile}
              width="35"
              height="35"
              alt="the valediktoria logo"
              className="rounded-full"
            />
            <div className=" text-third font-montserrat font-semibold font-medium rounded-xl bg-first">
              {currentUser.displayName
                ? currentUser.displayName
                : currentUser.email}
            </div>
            <div className="text-second">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <circle cx="12" cy="12" r="12" />
              </svg>
            </div>
          </div>

          <button className="py-1 px-4 flex items-center justify-center gap-2 bg-first rounded-xl text-third text-sm font-montserrat font-semibold hover:bg-third hover:text-first border border-third">
            Send Friend Request
          </button>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 gap-4 ">
        <div className="flex flex-col gap-4 justify-start">
          <div className="w-full rounded-[15px] bg-first border border-third">
            <div className="flex justify-between items-center m-4 pb-4 border-b border-third">
              <div className="font-montserrat text-sm font-semibold text-third ">
                Bio
              </div>
              <p className="text-xs text-first  px-4 py-1 font-montserrat font-medium bg-second rounded-xl">
                Pharmacist
              </p>
            </div>
            <div className="flex-col justify-start items-end px-4 pb-4">
              <p className="text-xs text-third font-medium font-montserrat">
                Over here we are going to write a long ass bio that expresses
                everything that y&apos;all need to know and maybe more that
                y&apos;all don&apos;t need to know yk, and that is all.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 justify-start">
          <div className="w-full rounded-[15px] bg-first border border-third">
            <div className="flex justify-between items-center p-4">
              <p className="font-montserrat text-sm font-semibold text-third ">
                Stats
              </p>
              <div className="flex justify-center gap-2 items-center">
                <div className="text-second">
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M8.625 0c.61 7.189-5.625 9.664-5.625 15.996 0 4.301 3.069 7.972 9 8.004 5.931.032 9-4.414 9-8.956 0-4.141-2.062-8.046-5.952-10.474.924 2.607-.306 4.988-1.501 5.808.07-3.337-1.125-8.289-4.922-10.378zm4.711 13c3.755 3.989 1.449 9-1.567 9-1.835 0-2.779-1.265-2.769-2.577.019-2.433 2.737-2.435 4.336-6.423z" />
                  </svg>
                </div>
                <p className="font-montserrat font-semibold text-sm text-center">
                  122
                </p>
              </div>
            </div>
          </div>
          <div className="w-full rounded-[15px] bg-first border border-third">
            <div className="flex justify-between items-center p-4">
              <p className="font-montserrat text-sm font-semibold text-third ">
                Friends
              </p>
              <p className="bg-second py-1  px-4 font-montserrat text-xs text-first rounded-xl">
                14
              </p>
            </div>
          </div>
          <div className="w-full rounded-[15px] bg-first border border-third">
            <div className="flex justify-between items-center p-4">
              <p className="font-montserrat text-sm font-semibold text-third ">
                Current Room
              </p>
              <p className="bg-second py-1  px-4 font-montserrat text-xs text-first rounded-xl">
                Powder
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
