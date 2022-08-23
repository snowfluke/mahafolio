// @ts-check

const express = require("express");
const {
  createFolio,
  getFolio,
  getFolios,
  updateFolio,
  deleteFolio,
  searchFolio,
} = require("../controllers/folio");

const auth = require("../middlewares/auth");
const router = express.Router();

// GET all folio
router.get("/mahasiswa/:id", getFolios);

// GET single folio
router.get("/:id", getFolio);

// GET a search folio
router.get("/search/:keyword", searchFolio);

//* Require Authorization
router.use(auth);

// POST a new folio
router.post("/", createFolio);

// EDIT a folio
router.patch("/:id", updateFolio);

// DELETE a folio
router.delete("/:id", deleteFolio);

module.exports = router;