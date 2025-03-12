import { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("ws://localhost:5000", {
  transports: ["websocket"],
});

export default function Dummy() {
  function handleCall(textValue) {
    console.log(`The value got received ${textValue}`);
  }
  useEffect(() => {
    socket.on("dummy", handleCall);

    return () => {
      socket.off("dummy", handleCall);
    };
  }, []);

  return <div>This screen</div>;
}
