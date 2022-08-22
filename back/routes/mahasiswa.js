// @ts-check

const express = require("express");
const {
  signinMhs,
  signupMhs,
  deleteMhs,
  getMhs,
  searchMhs,
  updateMhs,
  getLeaderboard,
} = require("../controllers/mahasiswa");
const router = express.Router();

// GET TOP 10 SCORE
router.get("/", getLeaderboard);

// GET MHS:ID
router.get("/:id", getMhs);

// PATCH MHS:ID
router.patch("/:id", updateMhs);

// DELETE MHS:ID
router.delete("/:id", deleteMhs);

// GET SEARCH:KEYWORD
router.get("/search/:keyword", searchMhs);

// POST SIGNIN
router.post("/signin", signinMhs);

// POST SIGNUP
router.post("/signup", signupMhs);

module.exports = router;
