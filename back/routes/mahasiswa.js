// @ts-check

const express = require("express");
const {
  signinMhs,
  signupMhs,
  getMhs,
  searchMhs,
  updateMhs,
  getLeaderboard,
  forgotPassword,
} = require("../controllers/mahasiswa");
const auth = require("../middlewares/auth");
const router = express.Router();

// GET TOP 10 SCORE
router.get("/", getLeaderboard);

// GET MHS:ID
router.get("/:id", getMhs);

// POST SIGNIN
router.post("/signin", signinMhs);

// POST FORGOT PASSWORD
router.post("/forgot-password", forgotPassword);

// POST SIGNUP
router.post("/signup", signupMhs);

// GET SEARCH:KEYWORD
router.get("/search/:keyword", searchMhs);

//* Require Authorization
router.use(auth);

// PATCH MHS:ID
router.patch("/:id", updateMhs);

module.exports = router;
