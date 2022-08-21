const express = require("express");
const router = express.Router();

// PATCH MHS:ID
router.patch("/:id", (req, res) => {
  res.json({ msg: "PATCH data mahasiswa sesuai id" });
});

// GET MHS:ID
router.get("/:id", (req, res) => {
  res.json({ msg: "GET mahasiswa sesuai id" });
});

// GET SEARCH
router.get("/search/:keyword", (req, res) => {
  res.json({ msg: "GET mahasiswa sesuai keyword pencarian" });
});

// POST REGISTER
router.post("/register", (req, res) => {
  res.json({ msg: "POST data registrasi mahasiswa" });
});

// POST LOGIN
router.post("/login", (req, res) => {
  res.json({ msg: "POST data login" });
});

// GET Random mhs
router.get("/", (req, res) => {
  res.json("OK");
});

module.exports = router;
