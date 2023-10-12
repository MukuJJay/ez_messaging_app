import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "node:http";
import userAuthRoutes from "./routes/userAuth.js";
import contacts from "./routes/contacts.js";
import message from "./routes/message.js";
import { sendMessage } from "./controllers/send-receiveMessage.js";
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
app.use("/message", message);

//io
export const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("socket connected");
  socket.on("disconnect", () => {
    console.log("socket disconnected");
  });
  socket.on("chatMsg", (data) => {
    sendMessage(io, socket, data);
  });
});

//server
server.listen(PORT, () => {
  console.log(`Listening on port number ${PORT}`);
});
