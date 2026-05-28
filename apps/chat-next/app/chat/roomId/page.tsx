"use client";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {BACKEND_URL, WS_URL } from "../../config";

export default function ChatPage({
  params
}: {
  params: { roomId: string };
}) {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    async function getChats() {
      const response = await axios.get(
        `${BACKEND_URL}/chats/${params.roomId}`
      );

      const messages = response.data.messages.map((x: any) => x.message);

      setMessages(messages.reverse());
    }

    getChats();

    const token = localStorage.getItem("token");

    const ws = new WebSocket(`${WS_URL}?token=${token}`);

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId: params.roomId
        })
      );
    };

    ws.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);

      if (parsedData.type === "chat") {
        setMessages((m) => [...m, parsedData.message]);
      }
    };

    wsRef.current = ws;

    return () => {
      ws.close();
    };
  }, [params.roomId]);

  function sendMessage() {
    if (!wsRef.current) return;

    wsRef.current.send(
      JSON.stringify({
        type: "chat",
        message: input,
        roomId: params.roomId
      })
    );

    setInput("");
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-1 p-6 overflow-y-auto">
        {messages.map((message, index) => (
          <div
            key={index}
            className="bg-gray-200 p-3 rounded mb-2 w-fit"
          >
            {message}
          </div>
        ))}
      </div>

      <div className="p-4 border-t flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="border p-2 flex-1"
          placeholder="Type message..."
        />

        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}