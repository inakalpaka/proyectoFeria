import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// hacer put y patch
router.post("/", async (req, res) => {
  try {
    const { name, lastName, number } = req.body;
    const contact = new Contact({ name, lastName, number });
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// router.put("/", async (req, res) => {
//   try {
//     const { name, lastName, number } = req.body;
//     const contact = new Contact({ name, lastName, number });
//     await contact.save();
//     res.status(201).json(contact);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

router.delete("/:id", async (req, res) => {
  try {
    const user = await Contact.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
