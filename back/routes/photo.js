// @ts-check

const express = require("express");
const { getPhoto } = require("../controllers/photo");
const router = express.Router();

// GET PHOTO BY MHS ID
router.get("/:id", getPhoto);

module.exports = router;
