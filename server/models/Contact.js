import mongoose from "mongoose";

const Contact = new mongoose.Schema({
  nombre: {
    type: String,
    unique: false,
    required: true,
  },
  apellido: {
    type: String,
    unique: false,
    required: false,
  },
  numero: {
    type: String,
    unique: true,
    required: true,
  },
});

export default mongoose.model("Contact", Contact);
