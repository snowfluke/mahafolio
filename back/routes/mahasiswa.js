// @ts-check

const express = require("express");
const { signinMhs, signupMhs, deleteMhs } = require("../controllers/mahasiswa");
const router = express.Router();

// GET TOP 10 SCORE
router.get("/", (req, res) => {
  res.json("OK");
});

// GET MHS:ID
router.get("/:id", (req, res) => {
  res.json({ msg: "GET mahasiswa sesuai id" });
});

// PATCH MHS:ID
router.patch("/:id", (req, res) => {
  res.json({ msg: "PATCH data mahasiswa sesuai id" });
});

// DELETE MHS:ID
router.delete("/:id", deleteMhs);

// GET SEARCH:KEYWORD
router.get("/search/:keyword", (req, res) => {
  res.json({ msg: "GET mahasiswa sesuai keyword pencarian" });
});

// POST SIGNIN
router.post("/signin", signinMhs);

// POST SIGNUP
router.post("/signup", signupMhs);

module.exports = router;
