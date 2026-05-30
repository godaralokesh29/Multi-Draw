"use client"
import { Canvas } from "./Canvas";
import { useEffect, useRef, useState } from "react";
import { initDraw } from "../draw";
import { WS_URL } from "@/config";

export function RoomCanvas({roomId}:{roomId:string}){

    const [socket,setSocket]=useState<WebSocket|null>(null);
    useEffect(()=>{
        const ws=new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlMWNlZmM5My1lYThlLTQwOGYtOTgxNS1lOGIzMTgyOWY4NzAiLCJpYXQiOjE3ODAxNzM1MjN9.vG5ZBB5pcdhl1yicm46OoTNLL4zQByZOUVUfz0mJ6mo`)

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