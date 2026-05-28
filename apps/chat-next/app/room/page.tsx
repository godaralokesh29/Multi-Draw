"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BACKEND_URL } from "../config";

export default function RoomPage() {
  const [roomName, setRoomName] = useState("");

  const router = useRouter();

  async function createRoom() {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${BACKEND_URL}/room`,
        {
          name: roomName
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      router.push(`/chat/${response.data.roomId}`);
    } catch (e) {
      alert("Room creation failed");
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border p-6 rounded w-96">
        <h1 className="text-2xl font-bold mb-4">Create Room</h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Room name"
          onChange={(e) => setRoomName(e.target.value)}
        />

        <button
          onClick={createRoom}
          className="bg-black text-white px-4 py-2 rounded w-full"
        >
          Create
        </button>
      </div>
    </div>
  );
}