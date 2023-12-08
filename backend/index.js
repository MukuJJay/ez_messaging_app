import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "node:http";
import userAuthRoutes from "./routes/userAuth.routes.js";
import contacts from "./routes/contacts.routes.js";
import {
  receiveMessage,
  sendMessage,
} from "./controllers/send-receiveMessage.controller.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();
const server = createServer(app);

//db setup
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Database Connected");
});

db.on("error", (err) => {
  console.log(err);
});

//setups express
app.use(express.json());
app.use(cors());

app.use("/auth", userAuthRoutes);
app.use("/user", contacts);

//io
export const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
  socket.on("sendMsg", (data) => {
    sendMessage(io, socket, data);
  });
  socket.on("receiveMsg", (data) => {
    receiveMessage(io, socket, data);
  });
});

//server
server.listen(PORT, () => {
  console.log(`Listening on port number ${PORT}`);
});
