import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const router = express.Router();
const saltRounds = 10;

router.post("/", async (req, res) => {
  const { name, password } = req.body;

  const exists = await User.exists({ name: name });

  if (!exists) {
    bcrypt
      .hash(password, saltRounds)
      .then(async (hash) => {
        const user = new User({ name: name, password: hash });
        await user.save();
        res.status(201).json(user);
      })
      .catch((error) => res.status(400).json({ message: error.message }));
  } else {
    res.status(406).send(`User ${name} already exists`);
  }
});

export default router;
