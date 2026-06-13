import { HTTP_BACKEND } from "@/config";
import axios from "axios";
import { getToken } from "@/lib/auth";

export async function createRoom(name: string) {
  const token = getToken();
  if (!token) {
    throw new Error("Not authenticated");
  }

  const res = await axios.post(
    `${HTTP_BACKEND}/room`,
    { name },
    {
      headers: {
        authorization: token,
      },
    }
  );

  return res.data;
}

export async function getExistingShapes(roomId: string) {
  const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
  const messages = res.data.messages;

  const shapes = messages.map((x: { message: string }) => {
    const messageData = JSON.parse(x.message);
    return messageData.shape;
  });

  return shapes;
}
