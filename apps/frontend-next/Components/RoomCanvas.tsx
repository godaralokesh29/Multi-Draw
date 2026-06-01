"use client"
import { Canvas } from "./Canvas";
import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import { WS_URL } from "@/config";

export function RoomCanvas({roomId}:{roomId:string}){

    const [socket,setSocket]=useState<WebSocket|null>(null);
    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI4ZmZhMjA2Ny0xMDkzLTQ1NzAtYjQyNC01NWI1MjU2ODFjMTYiLCJpYXQiOjE3ODAyMzM2ODN9.G4P2zZm8Nm4GjD0yONa7AlQK8kVauJKJwD6LNSNh2fk`)

        ws.onopen=()=>{
            setSocket(ws);
            ws.send(JSON.stringify({
              type:"join_room",
              roomId
            }))
        }
    },[])


    if(!socket){
      return <div>
        connecting to server...
      </div>
    }

    

  return (
    <div>
      <Canvas roomId={roomId} socket={socket}/>
    </div>
  );
}