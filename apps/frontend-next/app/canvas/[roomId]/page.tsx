
import React, { use } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import {initDraw } from "@/draw/index"
import {Canvas} from "@/Components/Canvas"

export default function CanvasPage({params}:{
  params:{
    roomId:string;
  }
}) {
  const roomId= params.roomId;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  return <Canvas roomId={roomId}/>



  
}
