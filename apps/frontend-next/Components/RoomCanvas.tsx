"use client"
import { Canvas } from "./Canvas";
import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import { WS_URL } from "@/config";
import { useRouter } from "next/navigation";

export function RoomCanvas({roomId}:{roomId:string}){

    const [socket,setSocket]=useState<WebSocket|null>(null);
    const [error, setError]=useState<string|null>(null);
    const router = useRouter();
    
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            setError("No authentication token found. Please sign in.");
            router.push("/signin");
            return;
        }

        const ws = new WebSocket(
            `${WS_URL}?token=${token}`
        );

        ws.onopen = () => {
            setSocket(ws);

            ws.send(
                JSON.stringify({
                    type: "join_room",
                    roomId: String(roomId),
                })
            );
        };

        ws.onerror = () => {
            setError("Failed to connect to server. Please try again.");
        };

        return () => ws.close();
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