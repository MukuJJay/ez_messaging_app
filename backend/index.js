import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import ws from "ws";
import userAuthRoutes from "./routes/userAuth.js";
import users from "./routes/contacts.js";
dotenv.config();

const PORT = process.env.PORT;
const app = express();

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
app.use(cors({ origin: true }));

app.use("/auth", userAuthRoutes);
app.use("/user", users);

//server
const server = app.listen(PORT, () => {
  console.log(`Listening on port number ${PORT}`);
});
