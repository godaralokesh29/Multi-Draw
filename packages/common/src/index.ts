import {z} from "zod";
export const userSchema = z.object({
   
    name: z.string(),

    username: z.string(),
    password: z.string(),
 })


 export const signinSchema = z.object({
  username: z.string(),
  password: z.string(),})

  export const CreateRoomSchema = z.object({
    roomName: z.string(),})