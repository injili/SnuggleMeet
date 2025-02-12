import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import AgoraRTC from "agora-rtc-sdk-ng";
import { useNavigate } from "react-router-dom";

const socket = io("ws://localhost:5000", {
  transports: ["websocket"],
});

export default function Room() {
  const [roomId, setRoomId] = useState("");
  const [token, setToken] = useState(null);
  const [uid, setUid] = useState(null);
  const [localTracks, setLocalTracks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const APP_ID = import.meta.env.VITE_APP_ID;
  const navigate = useNavigate();

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);

    if (mediaType == "video") {
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === "audio") {
      user.audioTrack.play;
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
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinedRoom = async ({ roomId, token, uid }) => {
    setRoomId(roomId);
    setToken(token);
    setUid(uid);
    console.log(
      `The App ID: ${APP_ID}, the room: ${roomId}, the token: ${token}`
    );
  };

  const client = AgoraRTC.createClient({
    mode: "rtc",
    codec: "vp8",
  });

  useEffect(() => {
    socket.on("joined-room", handleJoinedRoom);

    client.on("user-joined", handleUserJoined);
    client.on("user-left", handleUserLeft);
    client
      .join(APP_ID, roomId, token, null)
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
      console.log("Cleaning up...");
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
      socket.off("joined-room");
      client.unpublish(localTracks).then(() => client?.leave());
    };
  }, []);

  const toggleAudio = async () => {
    if (localTracks[0]) {
      if (isAudioMuted) {
        await localTracks[0].setEnabled(true);
      } else {
        await localTracks[0].setEnabled(false);
      }
    }
    setIsAudioMuted(!isAudioMuted);
  };

  const toggleVideo = async () => {
    if (localTracks[0]) {
      if (isVideoMuted) {
        await localTracks[1].setEnabled(true);
      } else {
        await localTracks[1].setEnabled(false);
      }
    }
    setIsVideoMuted(!isVideoMuted);
  };

  return (
    <div>
      <h1>Agora meeting Room</h1>
      {roomId ? <p>You are in {roomId}</p> : <p>Connecting ...</p>}
      <div className="grid grid-cols-2 gap-4 m-4">
        <div
          id="local-user"
          className="bg-second"
          style={{ width: "200px", height: "150px" }}
        ></div>
        {users.map((user) => (
          <div
            key={user.uid}
            id={`user-${user.uid}`}
            className="bg-third"
            style={{ width: "200px", height: "150px" }}
          ></div>
        ))}
      </div>
      <div>
        <button onClick={toggleAudio} className="m-2 p-2">
          {isAudioMuted ? "Unmute" : "Mute"} Audio
        </button>
        <button onClick={toggleVideo} className="m-2 p-2">
          {isVideoMuted ? "Turn on" : "Turn Off"} Video
        </button>
      </div>
    </div>
  );
}
