"use client"
import { useEffect, useRef } from "react";
import { initDraw } from "../draw"; 
import { IconButton } from "./IconButton";
import {CircleIcon, Pencil, RectangleHorizontalIcon} from "lucide-react"
import { useState } from "react";

type Shape="rect" | "circle" | "pensil"

export function Canvas({roomId, socket}: {roomId:string, socket:WebSocket}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool, setSelectedTool]=useState<Shape>("rect");
    
    useEffect(() => {
        // @ts-ignore
        window.selectedTool = selectedTool;
    }, [selectedTool]);
    useEffect(() => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          return;
        }
        initDraw(ctx, canvas, roomId, socket);
      }
    }, [canvasRef, roomId, socket]);

    return <div style={{
      height: "100vh",
      width: "100vw",
      overflow: "hidden",
    }}>
      <canvas
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasRef}
      ></canvas>

      <Topbar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
    </div>
}



function Topbar({selectedTool,setSelectedTool}:{
  selectedTool:Shape,
  setSelectedTool: (tool:Shape)=>void
}){
  return <div style={{
    position:"fixed",
    top:10,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 10,
  }}>
    <div className="flex gap-2 p-2 bg-gray-900/80 backdrop-blur-md border border-gray-700/50 rounded-full shadow-lg">
      <IconButton activated={selectedTool==="pencil" } icon={<Pencil size={20}/>} onClick={()=>{setSelectedTool("pencil")}} />
      <IconButton activated={selectedTool==="rect" } icon={<RectangleHorizontalIcon size={20}/>} onClick={()=>{setSelectedTool("rect")}} />
      <IconButton activated={selectedTool==="circle" } icon={<CircleIcon size={20}/>} onClick={()=>{setSelectedTool("circle")}} />
    </div>
  </div>
}