import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import get_contacts from "./routes/get_contacts.js";
import modify_contact from "./routes/modify_contact.js";
import login from "./routes/login.js";
import signup from "./routes/signup.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Couldn't connect to MongoDB...", err));

app.use("/get_contacts", get_contacts);
app.use("/modify_contact", modify_contact);
app.use("/login", login);
app.use("/signup", signup);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
