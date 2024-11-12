import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
    required: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
});

export default mongoose.model("User", UserSchema);
