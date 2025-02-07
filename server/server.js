require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { RTCTokenBuilder, RTCRole } = require("agora-access-token");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;
const MAX_USERS = 12;
const PORT = 4000;

let rooms = [{ id: "room-1", users: [] }];

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  let room = rooms.find((r) => r.users.lenght < MAX_USERS);

  if (!room) {
    room = { id: `room-${rooms.length + 1}`, users: [] };
    room.push(room);
  }

  room.users.push(socket.id);
  socket.join(room.id);

  const uid = Math.floor(Math.random() * 10000);
  const role = RTCRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimeStamp = Math.floor(Date.now() / 1000);
  const privilegeExpiresTs = currentTimeStamp + expirationTimeInSeconds;

  const token = RTCTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    room.id,
    uid,
    role,
    privilegeExpiresTs
  );

  socket.emit("joined-room", { roomId: room.id, token, uid });

  console.log(`User ${socket.id} joined ${room.id}`);

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
    room.users = room.users.filter((user) => user !== socket.id);

    if (room.users.length === 0) {
      rooms = room.filter((r) => r.id !== room.id);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
