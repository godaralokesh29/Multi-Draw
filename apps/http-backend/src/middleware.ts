import express from 'express';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";
import { userSchema } from '@repo/common/types';
import { CreateRoomSchema } from '@repo/common/types';


export function middleware(req: Request, res: Response, next: NextFunction) {
    const token=req.headers["authorization"] ?? "";
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, JWT_SECRET);

    if(decodedToken){
        // Attach user information to the request object
        //@ts-ignore
        req.userId = decodedToken.userId;
        next();
    }else {
        return res.status(401).json({ error: "Unauthorized" });
    }
}