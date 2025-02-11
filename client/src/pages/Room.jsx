import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import AgoraRTC from "agora-rtc-sdk-ng";

const socket = io("ws://localhost:5000", {
  transports: ["websocket"],
});

export default function Room() {
  const [roomId, setRoomId] = useState(null);
  const [token, setToken] = useState(null);
  const [uid, setUid] = useState(null);
  const [localTracks, setLocalTracks] = useState([]);
  const [client, setClient] = useState(null);
  const [users, setUsers] = useState([]);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const APP_ID = import.meta.env.VITE_APP_ID;

  useEffect(() => {
    const handleJoinedRoom = async ({ roomId, token, uid }) => {
      setRoomId(roomId);
      setToken(token);
      setUid(uid);
      console.log(`Joined room: ${roomId}`);

      const agoraClient = AgoraRTC.createClient({
        mode: "rtc",
        codec: "vp8",
      });

      await agoraClient.join(APP_ID, roomId, token, uid);
      setClient(agoraClient);

      const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
      setLocalTracks(tracks);
      await agoraClient.publish(tracks);
      if (tracks[1]) {
        tracks[1].play("local-user");
      } else {
        console.error("Local video track not found!");
      }

      console.log("Published local tracks!");

      agoraClient.on("user-published", async (user, mediaType) => {
        await agoraClient.subscribe(user, mediaType);
        setUsers((prevUsers) => [...prevUsers, user]);

        if (mediaType === "video") {
          user.videoTrack.play(`user-${user.uid}`);
        }
        if (mediaType === "audio") {
          user.audioTrack.play();
        }
      });

      agoraClient.on("user-unpublished", (user) => {
        setUsers((prevUsers) => prevUsers.filter((u) => u.uid !== user.uid));
      });
    };
    socket.on("joined-room", handleJoinedRoom);
    return () => {
      console.log("Cleaning up...");
      socket.off("joined-room");
      client?.leave(); // Leave Agora session
      localTracks?.forEach((track) => track.stop());
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
