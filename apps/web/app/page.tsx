"use client"
import Image, { type ImageProps } from "next/image";
import { Button } from "@repo/ui/button";
import styles from "./page.module.css";
import { useState } from "react"
import { useRouter } from "next/navigation";


export default function Home(){
  const [roomId,setRoomId]=useState("");
  const router =useRouter()
  
  return (
    <div className="styles.page">
      <input type="text" placeholder="Room Id" value={roomId} onChange={(e)=>{
            setRoomId(e.target.value)
      }} />

     <div className=""> <button onClick={()=>{
        router.push(`/room/${roomId}`)
      }}>click to join room</button>
      </div>
    </div>
  )

}