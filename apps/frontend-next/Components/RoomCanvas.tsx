"use client"
import { Canvas } from "./Canvas";
import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import { WS_URL, HTTP_BACKEND } from "@/config";
import { useRouter } from "next/navigation";
import axios from "axios";

export function RoomCanvas({roomId}:{roomId:string}){

    const [socket,setSocket]=useState<WebSocket|null>(null);
    const [error, setError]=useState<string|null>(null);
    const router = useRouter();

    useEffect(() => {
        let ws: WebSocket | null = null;

        const initRoom = async () => {
            const token = localStorage.getItem("token");

            if (!token || token === "undefined") {
                setError("No authentication token found. Please sign in.");
                router.push("/signin");
                return;
            }

            try {
                const roomRes = await axios.get(`${HTTP_BACKEND}/room/${roomId}`);
                let room = roomRes.data.room;

                if (!room) {
                    console.log("Room not found, creating new room with id:", roomId);
                    const createRes = await axios.post(
                        `${HTTP_BACKEND}/room`,
                        { name: roomId },
                        { headers: { Authorization: token } }
                    );
                    room = createRes.data;
                }

                ws = new WebSocket(
                    `${WS_URL}?token=${token}`
                );

                ws.onopen = () => {
                    console.log("WebSocket connected");
                    setSocket(ws);

                    ws?.send(
                        JSON.stringify({
                            type: "join_room",
                            roomId: String(roomId),
                        })
                    );
                };

                ws.onerror = (event) => {
                    console.error("WebSocket error:", event);
                    setError("Failed to connect to server. Please try again.");
                };

                ws.onclose = () => {
                    console.log("WebSocket closed");
                };
            } catch (err: any) {
                console.error("Error initializing room:", err);
                setError("Failed to initialize room");
            }
        };

        initRoom();

        return () => {
            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.close();
            }
        };
    }, [roomId, router]);


    if(error){
        return <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
            <div style={{textAlign:"center"}}>
                <p style={{color:"red", fontSize:"18px"}}>{error}</p>
            </div>
        </div>
    }

    if(!socket){
        return <div style={{display:"flex", justifyContent:"center", alignItems:"center", height:"100vh"}}>
            <p>Connecting to server...</p>
        </div>
    }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket}/>
    </div>
  );
}