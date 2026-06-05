import {RoomCanvas} from "@/Components/RoomCanvas"

export default async function CanvasPage({params}:{
  params:{
    roomId:string;
  }
}) {
  const roomId = (await params).roomId;
  console.log("Canvas page roomId:", roomId);
  return <RoomCanvas roomId={roomId}/>
}
