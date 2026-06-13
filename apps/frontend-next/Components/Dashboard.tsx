"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createRoom } from "@/draw/api";
import { Plus } from "lucide-react";

export default function Dashboard() {
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleJoinRoom = () => {
    if (!roomId.trim()) return;
    setError("");
    router.push(`/canvas/${roomId}`);
  };

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      setError("Please enter a room name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await createRoom(roomName);
      if (response.roomId) {
        router.push(`/canvas/${response.roomId}`);
      }
    } catch (err: any) {
      console.error("Error creating room:", err);
      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to create room. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Excalidraw Whiteboard
          </h1>
          <p className="text-slate-400">
            Create or join a collaborative drawing room
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        )}

        {/* Cards Container */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Create Room Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl hover:border-slate-700 transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-500/20 p-3 rounded-lg">
                <Plus className="text-green-500" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-white">Create Room</h2>
            </div>

            <p className="text-slate-400 mb-6">
              Start a new collaborative drawing session
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleCreateRoom();
                }}
                className="w-full p-3 rounded-lg border border-slate-700 bg-slate-800 text-white outline-none focus:ring-2 focus:ring-green-500 transition"
              />

              <button
                onClick={handleCreateRoom}
                disabled={loading || !roomName.trim()}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Room"}
              </button>
            </div>

            <div className="mt-4 p-3 bg-slate-800/50 rounded-lg">
              <p className="text-sm text-slate-400">
                💡 Tip: Share the room ID with others to collaborate together
              </p>
            </div>
          </div>

          {/* Join Room Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl hover:border-slate-700 transition">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-blue-500/20 p-3 rounded-lg">
                <div className="text-blue-500 font-bold">→</div>
              </div>
              <h2 className="text-2xl font-bold text-white">Join Room</h2>
            </div>

            <p className="text-slate-400 mb-6">
              Join an existing collaborative session
            </p>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter Room ID or Name"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleJoinRoom();
                }}
                className="w-full p-3 rounded-lg border border-slate-700 bg-slate-800 text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
              />

              <button
                onClick={handleJoinRoom}
                disabled={!roomId.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:bg-gray-600 disabled:cursor-not-allowed"
              >
                Join Room
              </button>
            </div>

            <div className="mt-4 space-y-2">
              <p className="text-sm text-slate-400">
                📋 You can use:
              </p>
              <ul className="text-xs text-slate-500 space-y-1">
                <li>• Room ID (numeric)</li>
                <li>• Room name (slug)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
          <p className="text-slate-400 text-center">
            ✨ Ready to collaborate? Create or join a room to get started.
          </p>
        </div>
      </div>
    </div>
  );
}