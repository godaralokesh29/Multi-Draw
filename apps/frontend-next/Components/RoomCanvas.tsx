"use client";

import { WS_URL } from "@/config";
import { getToken } from "@/lib/auth";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}: {roomId: string}) {
    const [socket, setSocket] = useState<WebSocket | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            setError("Not authenticated. Please sign in.");
            return;
        }

        const ws = new WebSocket(`${WS_URL}?token=${token}`)

        ws.onopen = () => {
            setSocket(ws);
            setError(null);
            const data = JSON.stringify({
                type: "join_room",
                roomId
            });
            console.log(data);
            ws.send(data)
        }

        ws.onerror = () => {
            setError("Failed to connect to room");
        }

        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        }
    }, [roomId])
   
    if (error) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center">
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-4 rounded">
                {error}
            </div>
        </div>
    }

    if (!socket) {
        return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
            Connecting to server....
        </div>
    }

    return <div>
        <Canvas roomId={roomId} socket={socket} />
    </div>
}