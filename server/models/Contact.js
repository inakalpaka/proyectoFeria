import mongoose from "mongoose";

const Contact = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true,
  },
  lastName: {
    type: String,
    unique: false,
    required: false,
  },
  number: {
    type: String,
    unique: true,
    required: true,
  },
});

export default mongoose.model("Contact", Contact);
