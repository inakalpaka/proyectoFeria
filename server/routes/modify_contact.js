import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { nombre, apellido, numero } = req.body;
    const contact = new Contact({ nombre, apellido, numero });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
