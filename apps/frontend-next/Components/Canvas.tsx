"use client"
import { useEffect, useRef } from "react";
import { initDraw } from "../draw"; 

export function Canvas({roomId, socket}: {roomId:string, socket:WebSocket}){
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
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

    return <div>
      <canvas
        width={2080}
        height={2080}
        ref={canvasRef}
      ></canvas>
    </div>
}
