import {z} from "zod";
export const userSchema = z.object({
   
  username: z.string(),
  password: z.string(),
  name: z.string(),
 })


 export const signinSchema = z.object({
  username: z.string(),
  password: z.string(),})

  export const CreateRoomSchema = z.object({
    name: z.string() })