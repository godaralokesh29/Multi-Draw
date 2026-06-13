import { RoomCanvas } from "@/Components/RoomCanvas";

export default async function CanvasPage({
  params,
}: {
  params: Promise<{
    roomId: string;
  }>;
}) {
  const { roomId } = await params;

  console.log("Canvas page roomId:", roomId);

  return <RoomCanvas roomId={roomId} />;
}