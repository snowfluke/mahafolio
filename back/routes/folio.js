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

// GET latest folio
router.get("/mahasiswa/:id", getFolios);

// GET a search folio
router.get("/search", searchFolio);

// GET single folio
router.get("/:id", getFolio);

//* Require Authorization
router.use(auth);

// POST a new folio
router.post("/", createFolio);

// EDIT a folio
router.patch("/:id", updateFolio);

// DELETE a folio
router.delete("/:id", deleteFolio);

module.exports = router;
