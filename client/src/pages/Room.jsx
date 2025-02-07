import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import AgoraRTC from "agora-rtc-sdk-ng";

const socket = io("http://localhost:4000");

export default function Room() {
  const [roomId, setRoomId] = useState(null);
  const [token, setToken] = useState(null);
  const [uid, setUid] = useState(null);
  const [localTracks, setLocalTracks] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    socket.on("joined-room", async ({ roomId, token, uid }) => {
      setRoomId(roomId);
      setToken(token);
      setUid(uid);
      console.log(`Joined room: ${roomId}`);

      const agoraClient = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
      setClient(agoraClient);

      await agoraClient.join("your-agora-app-id", roomId, token, uid);

      const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
      setLocalTracks(tracks);
      await agoraClient.publish(tracks);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Agora meeting Room</h1>
      {roomId ? <p>You are in {roomId}</p> : <p>Connecting ...</p>}
    </div>
  );
}
