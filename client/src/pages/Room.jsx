import theLogo from "../assets/img/icon.png";
import { Navigate, Link } from "react-router-dom";
import { useAuth } from "../api/context";
import { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoPlayer } from "../components/videoplayer";

const APP_ID = import.meta.env.VITE_APP_ID;
const TOKEN = import.meta.env.VITE_APP_TOKEN;
const CHANNEL = import.meta.env.VITE_APP_CHANEL;

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

export default function Room() {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const { currentUser } = useAuth();

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType === "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType == "audio") {
      // user.audioTrack.play
    }
  };
  const handleUserLeft = (user) => {
    setUsers((previousUsers) =>
      previousUsers.filter((u) => u.uid !== user.uid)
    );
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);

    client
      .join(APP_ID, CHANNEL, TOKEN, null)
      .then((uid) =>
        Promise.all([AgoraRTC.createMicrophoneAndCameraTracks(), uid])
      )
      .then(([tracks, uid]) => {
        const [audioTrack, videoTrack] = tracks;
        setLocalTracks(tracks);
        setUsers((previousUsers) => [
          ...previousUsers,
          {
            uid,
            videoTrack,
          },
        ]);
        client.publish(tracks);
      });

    return () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
      client.unpublish(localTracks).then(() => client.leave());
    };
  }, []);

  return (
    <div className="min-h-screen">
      {!currentUser && <Navigate to={"/"} replace={true} />}
      <div className="h-full p-4">
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-4 items-center">
            <Link to="/home">
              <img
                src={theLogo}
                alt="our logo snugglemeet"
                height={29}
                width={29}
              />
            </Link>
            <h1 className="font-bowldy font-thin text-second tracking-wide text-xl">
              ROOM A
            </h1>
          </div>
          <div>
            <Link to="/">
              {" "}
              <button className="text-sm text-second font-semibold font-alata px-4 border border-2 bg-third border-second">
                LEAVE
              </button>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-2 py-2 items-center w-full px-16 gap-1">
          {users.map((user) => (
            <VideoPlayer
              key={user.uid}
              user={user}
              className="w-[200px] h-[200px] aspect-square border-2 border-second bg-third"
            />
          ))}
        </div>
        <p className="font-alata text-sm text-center">
          Powered by <span className="text-forth">injili.tech</span>
        </p>
      </div>
    </div>
  );
}
