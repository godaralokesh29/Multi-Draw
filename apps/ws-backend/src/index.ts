import { WebSocket, WebSocketServer } from 'ws';
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

interface User{
  ws: WebSocket,
  rooms: string[],
  userId: string
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == "string") {
      return null;
    }

    if (!decoded || !decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch(e) {
    return null;
  }

  
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split('?')[1]);
  const token = queryParams.get('token') || "";
  const userId = checkUser(token);

  if (userId == null) {
    ws.close()
    return null;
  }

  users.push({
    userId,
    rooms: [],
    ws
  })

  ws.on('message', async function message(data) {
    let parsedData;
    if (typeof data !== "string") {
      parsedData = JSON.parse(data.toString());
    } else {
      parsedData = JSON.parse(data); // {type: "join-room", roomId: 1}
    }

    if (parsedData.type === "join_room") {
      const user = users.find(x => x.ws === ws);
      if (user) {
        user.rooms.push(parsedData.roomId);
        console.log(`👤 User ${user.userId} joined room ${parsedData.roomId}`);
        console.log(`📊 Total users in room ${parsedData.roomId}:`, users.filter(u => u.rooms.includes(parsedData.roomId)).length);
      }
    }

    if (parsedData.type === "leave_room") {
      const user = users.find(x => x.ws === ws);
      if (!user) {
        return;
      }
      user.rooms = user?.rooms.filter(x => x !== parsedData.roomId);
      console.log(`👤 User ${user.userId} left room ${parsedData.roomId}`);
    }

    console.log("📨 Message received:", parsedData.type, "for room:", parsedData.roomId);

    if (parsedData.type === "chat") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;

      console.log(`💬 Broadcasting chat to room ${roomId}`);
      const usersInRoom = users.filter(user => user.rooms.includes(roomId.toString()));
      console.log(`📤 Sending to ${usersInRoom.length} users in room ${roomId}`);

      // Try to save to database but don't let it block the broadcast
      try {
        const numericRoomId = Number(roomId);

        let room = await prismaClient.room.findUnique({
          where: { id: numericRoomId }
        });

        // If not found by ID, try by slug
        if (!room) {
          room = await prismaClient.room.findFirst({
            where: { slug: roomId.toString() }
          });
        }

        if (room) {
          await prismaClient.chat.create({
            data: {
              roomId: room.id,
              message,
              userId
            }
          });
          console.log(`✅ Chat saved to database for room ${roomId}`);
        } else {
          console.log(`⚠️ Room not found for room ID: ${roomId} (but still broadcasting)`);
        }
      } catch(e) {
        console.error("Error saving chat to database:", e);
        // Don't stop the broadcast even if database save fails
      }

      // ALWAYS broadcast regardless of database save
      console.log(`📨 Broadcasting message to users in room ${roomId}`);
      users.forEach(user => {
        if (user.rooms.includes(roomId.toString())) {
          console.log(`   ✅ Sending to user ${user.userId}`);
          user.ws.send(JSON.stringify({
            type: "chat",
            message: message,
            roomId
          }))
        }
      })
    }

    if (parsedData.type === "sync") {
      const roomId = parsedData.roomId;
      const message = parsedData.message;
      
      console.log(`👁️ Broadcasting sync (preview) to room ${roomId}`);
      const usersInRoom = users.filter(user => user.rooms.includes(roomId.toString()) && user.ws !== ws);
      console.log(`📤 Sending preview to ${usersInRoom.length} other users in room ${roomId}`);
      
      users.forEach(user => {
        if (user.rooms.includes(roomId.toString()) && user.ws !== ws) {
          user.ws.send(JSON.stringify({
            type: "sync",
            message: message,
            roomId
          }))
        }
      })
    }

  });

});