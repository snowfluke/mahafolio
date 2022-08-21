const express = require("express");
const router = express.Router();
const Folio = require("../models/folio");
const { SCORING } = require("../utils/constant");

// GET 10 latest work
router.get("/", (req, res) => {
  res.json({ msg: "OK" });
});

// GET single work
router.get("/:id", (req, res) => {
  res.json({ msg: "GET one folio by id" });
});

// GET a search work
router.get("/search/:id", (req, res) => {
  res.json({ msg: "GET one folio by id" });
});

// POST a new work
router.post("/", async (req, res) => {
  const { title, type, semester, subject, url, description } = req.body;
  try {
    const folio = await Folio.create({
      title,
      type,
      semester,
      subject,
      url,
      description,
      score: SCORING[type],
    });
    res.status(200).json(folio);
  } catch (error) {
    if (error.name === "ValidationError") {
      let errors = {};

      Object.keys(error.errors).forEach((key) => {
        if (key !== "score") {
          errors[key] = error.errors[key].message;
        }
      });

      return res.status(400).send(errors);
    }
    res.status(500).send("Something went wrong");
  }
});

// EDIT a work
router.patch("/:id", (req, res) => {
  res.json({ msg: "Delete a work" });
});

// DELETE a work
router.delete("/:id", (req, res) => {
  res.json({ msg: "Delete a work" });
});

module.exports = router;
