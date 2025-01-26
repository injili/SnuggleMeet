import theLogo from "../assets/img/icon.png";
import { Navigate, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../api/context";
import { useEffect, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import { VideoPlayer } from "../components/videoplayer";
import { db } from "../api/firebase";
import { collection, addDoc } from "firebase/firestore";

const APP_ID = import.meta.env.VITE_APP_ID;
const TOKEN = import.meta.env.VITE_APP_TOKEN;
const CHANNEL = import.meta.env.VITE_APP_CHANEL;

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

export default function Room() {
  const [jointime, setJointime] = useState(null);
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const { currentUser } = useAuth();
  const conferencingCollectionRef = collection(db, "conferencing");
  const navigate = useNavigate();

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

  const handleLeave = async () => {
    try {
      localTracks.forEach((track) => {
        track.stop();
        track.close();
      });

      const now = new Date();
      await addDoc(conferencingCollectionRef, {
        join: jointime,
        leave: now,
        username: currentUser.displayName
          ? currentUser.displayName
          : currentUser.email,
      });
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
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
    const now = new Date();

    setJointime(now);

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
            <h1 className="font-bolanosima font-semibold font text-second tracking-wide text-xl">
              ROOM A
            </h1>
          </div>
          <div>
            <button
              onClick={handleLeave}
              className="text-sm text-second font-semibold font-alata px-4 border border-2 bg-third border-second"
            >
              LEAVE
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 py-2 items-center w-full gap-2">
          {users.map((user) => (
            <VideoPlayer key={user.uid} user={user} />
          ))}
        </div>
        <p className="font-alata">
          Powered by <span className="text-xl text-forth">injili.tech</span>
        </p>
      </div>
    </div>
  );
}
