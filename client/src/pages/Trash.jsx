{
  /* <div className="text-center">
        <h1 className="font-bolanosima font-semibold text-2xl tracking-wide font-extralight">
          {currentUser.displayName
            ? currentUser.displayName
            : currentUser.email}
        </h1>
        <p className="font-alata">Change account password below...</p>
        {errorMessage && (
          <div
            role="alert"
            className=" absolute border border-forth top-4 right-4 bg-second p-2"
          >
            <div className="flex items-center gap-4">
              <span className="text-forth">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>

              <div className="flex-1">
                <p className="text-forth text-sm">Failed to reset password</p>
              </div>

              <button
                onClick={handleClose}
                className="text-forth transition hover:text-fifth"
              >
                <span className="sr-only">Dismiss popup</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
        {successMessage && (
          <div
            role="alert"
            className=" absolute border border-fifth top-4 right-4 bg-second p-2"
          >
            <div className="flex items-center gap-4">
              <span className="text-fifth">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>

              <div className="flex-1">
                <p className="text-fifth font-alata text-sm">
                  {successMessage}
                </p>
              </div>

              <button
                onClick={handleClose}
                className="text-fifth transition hover:text-forth"
              >
                <span className="sr-only">Dismiss popup</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handlePasswordChange}
        className="flex font-alata flex-col items-center justify-center gap-2 w-[200px]"
      >
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          placeholder="CURRENT PASSWORD"
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="NEW PASSWORD"
          className="w-full py-1 px-2 border border-2 bg-third border-second"
        />
        <div className="flex w-full items-center justify-between gap-4">
          <button
            type="submit"
            className="py-1 text-second font-semibold font-alata px-4 border border-2 bg-third border-second"
          >
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
      </form>*/
}
// import theLogo from "../assets/img/icon.png";
// import { Navigate, Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../api/context";
// import { useEffect, useState } from "react";
// import AgoraRTC from "agora-rtc-sdk-ng";
// import { VideoPlayer } from "../components/videoplayer";
// import { db } from "../api/firebase";
// import { collection, addDoc } from "firebase/firestore";

// const APP_ID = import.meta.env.VITE_APP_ID;
// const TOKEN = import.meta.env.VITE_APP_TOKEN;
// const CHANNEL = import.meta.env.VITE_APP_CHANEL;

// const client = AgoraRTC.createClient({
//   mode: "rtc",
//   codec: "vp8",
// });

// export default function Room() {
//   const [jointime, setJointime] = useState(null);
//   const [users, setUsers] = useState([]);
//   const [localTracks, setLocalTracks] = useState([]);
//   const { currentUser } = useAuth();
//   const conferencingCollectionRef = collection(db, "conferencing");
//   const navigate = useNavigate();

//   const handleUserJoined = async (user, mediaType) => {
//     await client.subscribe(user, mediaType);

//     if (mediaType === "video") {
//       setUsers((previousUsers) => [...previousUsers, user]);
//     }

//     if (mediaType == "audio") {
//       // user.audioTrack.play
//     }
//   };

//   const handleUserLeft = (user) => {
//     setUsers((previousUsers) =>
//       previousUsers.filter((u) => u.uid !== user.uid)
//     );
//   };

//   const handleLeave = async () => {
//     try {
//       localTracks.forEach((track) => {
//         track.stop();
//         track.close();
//       });

//       const now = new Date();
//       await addDoc(conferencingCollectionRef, {
//         join: jointime,
//         leave: now,
//         username: currentUser.displayName
//           ? currentUser.displayName
//           : currentUser.email,
//       });
//       navigate("/home");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     client.on("user-published", handleUserJoined);
//     client.on("user-left", handleUserLeft);

//     client
//       .join(APP_ID, CHANNEL, TOKEN, null)
//       .then((uid) =>
//         Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
//       )
//       .then(([tracks, uid]) => {
//         const [audioTrack, videoTrack] = tracks;
//         setLocalTracks(tracks);
//         setUsers((previousUsers) => [
//           ...previousUsers,
//           {
//             uid,
//             videoTrack,
//           },
//         ]);
//         client.publish(tracks);
//       });
//     const now = new Date();

//     setJointime(now);

//     return () => {
//       for (let localTrack of localTracks) {
//         localTrack.stop();
//         localTrack.close();
//       }
//       client.off("user-published", handleUserJoined);
//       client.off("user-left", handleUserLeft);
//       client.unpublish(localTracks).then(() => client.leave());
//     };
//   }, []);

//   return (
//     <div className="min-h-screen">
//       {!currentUser && <Navigate to={"/"} replace={true} />}
//       <div className="h-full p-4">
//         <div className="w-full flex justify-between items-center">
//           <div className="flex gap-4 items-center">
//             <Link to="/home">
//               <img
//                 src={theLogo}
//                 alt="our logo snugglemeet"
//                 height={29}
//                 width={29}
//               />
//             </Link>
//             <h1 className="font-bolanosima font-semibold font text-second tracking-wide text-xl">
//               ROOM A
//             </h1>
//           </div>
//           <div>
//             <button
//               onClick={handleLeave}
//               className="text-sm text-second font-semibold font-alata px-4 border border-2 bg-third border-second"
//             >
//               LEAVE
//             </button>
//           </div>
//         </div>
//         <div className="grid grid-cols-2 py-2 items-center w-full gap-2">
//           {users.map((user) => (
//             <VideoPlayer key={user.uid} user={user} />
//           ))}
//         </div>
//         <p className="font-alata">
//           Powered by <span className="text-xl text-forth">injili.tech</span>
//         </p>
//       </div>
//     </div>
//   );
// }
