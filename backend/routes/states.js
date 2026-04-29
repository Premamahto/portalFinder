const express = require("express");
const path = require("path");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res) => {
  const statesPath = path.join(__dirname, "../data/states.json");

  try {
    const data = fs.readFileSync(statesPath, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    console.error("[ERROR] Failed to load states.json:", err);
    res.status(500).json({ error: "Could not load states data" });
  }
});

module.exports = router;
