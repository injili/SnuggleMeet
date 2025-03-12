require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { RtcTokenBuilder, RtcRole } = require("agora-access-token");

const app = express();
const server = http.createServer(app);
app.use(cors({ origin: "http://localhost:5173" }));
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;
const PORT = 5000;

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  const uid = Math.floor(Math.random() * 10000);
  const room = "Snuggle";
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimeStamp = Math.floor(Date.now() / 1000);
  const privilegeExpiresTs = currentTimeStamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithUid(
    APP_ID,
    APP_CERTIFICATE,
    room,
    String(uid),
    role,
    privilegeExpiresTs
  );

  console.log(`The token: ${room}`);

  socket.emit("dummy", "Dummy Text");

  socket.emit("joined-room", { room, token, uid });

  console.log(`User ${socket.id} joined ${room}`);
  socket.on("disconnect", () => {
    console.log("a client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
