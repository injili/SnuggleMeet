import { useState } from "react";
import VideoRoom from "./components/VideoRoom";

export default function App() {
  const [joined, setJoined] = useState(false);

  return (
    <div className="bg-red-500 h-screen w-full">
      <h1 className="font-bold text-7xl p-8">SnuggleMeet</h1>

      {
        !joined && (
          <button onClick={() => setJoined(true)}>
            Join Room
          </button>
        )
      }

      {
        joined && (
          <VideoRoom/>
        )
      }
    </div>
  )
}