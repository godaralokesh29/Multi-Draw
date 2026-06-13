import express from "express";
import jwt from "jsonwebtoken";
import cors from "cors";
import {JWT_SECRET} from "@repo/backend-common/config"; 
import { middleware } from "./middleware";
import { userSchema } from '@repo/common/types';
import { CreateRoomSchema } from '@repo/common/types';
import { signinSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

const app = express();

app.use(cors());



app.use(express.json())  
app.post("/signup", async (req, res) => {

    const parsedData = userSchema.safeParse(req.body);
    if (!parsedData.success) {
        console.log(parsedData.error);
        res.status(400).json({
            message: "Incorrect inputs"
        })
        return;
    }
    try {
        const user = await prismaClient.user.create({
            data: { 
                email: parsedData.data?.username,
                // TODO: Hash the pw
                password: parsedData.data.password,
                //@ts-ignore
                name: parsedData.data.name
            }
        })
        res.json({
            userId: user.id
        })
    } catch(e) {
        console.error("Sign up error:", e);
        res.status(500).json({
            message: "Error creating user"
        })
    }
})

app.post("/signin", async (req, res) => {
    const parsedData = signinSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.status(400).json({
            message: "Incorrect inputs"
        })
        return;
    }

    try {
        // TODO: Compare the hashed pws here
        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.username,  
                password: parsedData.data.password
            }
        })

        if (!user) {
            res.status(403).json({
                message: "Not authorized"
            })
            return;
        }

        const token = jwt.sign({
            userId: user?.id
        }, JWT_SECRET);

        res.json({
            token
        })
    } catch (e) {
        console.error("Sign in error:", e);
        res.status(500).json({
            message: "Internal server error"
        })
    }
})

app.post("/room", middleware, async (req, res) => {
    const parsedData = CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect inputs"
        })
        return;
    }
    // @ts-ignore
    const userId = req.userId;

    try {
        const room = await prismaClient.room.create({
            data: {//@ts-ignore
                slug: parsedData.data.name,
                adminId: userId
            }
        })

        res.json({
            roomId: room.id
        })
    } catch(e) {
        res.status(411).json({
            message: "Room already exists with this name"
        })
    }
})

app.get("/chats/:roomId", async (req, res) => {
    try {
        const roomIdParam = req.params.roomId;
        console.log("🔍 Fetching chats for roomId param:", roomIdParam);
        
        const numericId = Number(roomIdParam);
        let room = null;
        
        // If roomIdParam is a valid number, try finding by ID
        if (!isNaN(numericId) && numericId > 0) {
            room = await prismaClient.room.findUnique({
                where: {
                    id: numericId
                }
            });
            console.log(`  └─ Tried numeric ID ${numericId}:`, room ? "✅ FOUND" : "❌ NOT FOUND");
        }
        
        // If not found by ID, try finding by slug
        if (!room) {
            room = await prismaClient.room.findFirst({
                where: {
                    slug: roomIdParam
                }
            });
            console.log(`  └─ Tried slug "${roomIdParam}":`, room ? "✅ FOUND" : "❌ NOT FOUND");
        }
        
        // If room doesn't exist, return empty messages (not 404)
        if (!room) {
            console.log(`⚠️ Room ${roomIdParam} not found, returning empty messages`);
            return res.status(200).json({
                messages: []
            });
        }
        
        console.log(`✅ Room found: ID=${room.id}, slug=${room.slug}`);
        
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: room.id
            },
            select: {
                id: true,
                message: true,
                roomId: true,
                userId: true
            },
            orderBy: {
                id: "desc"
            },
            take: 500
        });

        console.log(`✅ Returning ${messages.length} messages for room ${room.id}`);
        if (messages.length > 0) {
            console.log(`   Sample message:`, messages[0]);
        }
        res.status(200).json({
            messages
        })
    } catch(e) {
        console.error("❌ Error in /chats/:roomId:", e);
        res.status(200).json({
            messages: []
        })
    }
    
})

app.get("/room/:slug", async (req, res) => {
    const slug = req.params.slug;
    const room = await prismaClient.room.findFirst({
        where: {
            slug
        }
    });

    res.json({
        room
    })
})

app.listen(3001,()=>{
  console.log("Server is running on port 3001")
  
})