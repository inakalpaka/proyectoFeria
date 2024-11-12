import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name: name });

  if (user) {
    bcrypt.compare(password, user.password).then((result) => {
      result //
        ? res.status(200).send(true)
        : res.status(301).send(false);
    });
  } else {
    res.status(404).send("Error: user not found");
  }
});

export default router;
