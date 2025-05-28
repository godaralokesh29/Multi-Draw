import express from "express";
import jwt from "jsonwebtoken";
import JWT_SECRET from "./config"; 
import { middleware } from "./middleware"; // Import your middleware for authentication

const app = express();

interface User {
  id: number;
  username: string;
  password: string;
}

//@ts-ignore
app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  // Here you would typically save the user to a database
  const user = await User.create({
    username,
    password,
  });
  const userId = user.id;
  // Generate a JWT token (you need to install jsonwebtoken package)

  const token = jwt.sign(
    {
      userId,
    },
            JWT_SECRET,
    { expiresIn: "1h" }
  );

  console.log(token);
  res.status(201).json({ message: "User signed up successfully" });
});

app.listen(3003, () => {
  console.log("Server is running on http://localhost:3003");
});

app.post("/signin", async (req, res) => {
  const { username} = req.body;

  const user= await User.findUnique({
    where: {
        username
    }

    if(user){

       const token = jwt.sign(
    {
        userId: user.id,
        username: user.username
    },
   JWT_SECRET,
    { expiresIn: "1h" }
  ) ;

    }

})
})


app.post("/room", middleware ,async (req, res) => {
  const { roomId } = req.body;

  if (!roomId) {
    return res.status(400).json({ error: "Room name is required" });
  }

  // Here you would typically save the room to a database
  const room = await Room.create({
    data: {
      name: roomId,
    },
  });

  res.status(201).json({ message: "Room created successfully", room });
}
)