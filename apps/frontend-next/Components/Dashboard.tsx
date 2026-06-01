"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [roomId, setRoomId] = useState("");
  const router = useRouter();

  const handleJoinRoom = () => {
    if (!roomId.trim()) return;

    router.push(`/canvas/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <h1 className="text-3xl font-bold text-white text-center mb-2">
          Whiteboard Dashboard
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Enter a room ID to join or create a collaborative canvas.
        </p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full p-3 rounded-lg border border-slate-700 bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleJoinRoom}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition"
          >
            Join Room
          </button>
        </div>

        <div className="mt-6 text-center text-sm text-slate-500">
          Room will open at:
          <div className="mt-1 text-blue-400">
            /canvas/{roomId || "room-id"}
          </div>
        </div>
      </div>
    </div>
  );
}