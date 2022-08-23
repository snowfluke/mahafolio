// @ts-check

const express = require("express");
const { adminDeleteMhs, adminLogin } = require("../controllers/admin");
const adminAuth = require("../middlewares/admin");
const router = express.Router();

// POST ADMIN LOGIN
router.post("/", adminLogin);

//* Require Admin Authorization
router.use(adminAuth);

// DELETE MHS:ID
router.delete("/mahasiswa/:id", adminDeleteMhs);

module.exports = router;
