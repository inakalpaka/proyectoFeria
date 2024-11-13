"use strict";
import axios from "axios";

export default axios.create({
  baseURL: "https://proyectoferia.onrender.com/",
  headers: { "Content-Type": "application/json" },
});
