const express = require("express");
const router = express.Router();

// GET 10 latest work
router.get("/", (req, res) => {
  res.json({ msg: "OK" });
});

// GET single work
router.get("/:id", (req, res) => {
  res.json({ msg: "GET one folio by id" });
});

// POST a new work
router.post("/", (req, res) => {
  res.json({ msg: "POST a new folio" });
});

module.exports = router;
