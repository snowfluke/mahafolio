// @ts-check-ignore

const mongoose = require("mongoose");
const Folio = require("../models/folio");

// get all Folio
const getFolios = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID mahasiswa tidak valid" });
  }
  const folios = await Folio.find({ author: id }).sort({ createdAt: -1 });
  res.status(200).json(folios);
};

// get 1 Folio
const getFolio = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID folio tidak valid" });
  }

  const folio = await Folio.findById(id);
  if (!folio) {
    return res.status(404).json({ error: "Folio tidak ditemukan" });
  }

  res.status(200).json(folio);
};

// create a new Folio
const createFolio = async (req, res) => {
  try {
    const folio = await Folio.createFolio(req.body);
    res.status(200).json(folio);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// delete a Folio
const deleteFolio = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID folio tidak valid" });
  }

  const folio = await Folio.findOneAndDelete({ _id: id });
  if (!folio) {
    return res.status(404).json({ error: "Folio tidak ditemukan" });
  }

  res.status(200).json(folio);
};

// search a Folio
const searchFolio = async (req, res) => {
  const { keyword } = req.params;
  if (keyword.length < 3 || keyword.length > 15) {
    return res.status(400).json({ error: "Kata kunci hanya 3-15 karakter!" });
  }
  const folios = await Folio.find({
    title: { $regex: keyword.trim(), $options: "i" },
  });
  if (!folios) {
    return res.status(404).json({ error: "Folio tidak ditemukan" });
  }

  res.status(200).json(folios);
};

// update a folio
const updateFolio = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "ID folio tidak valid" });
  }

  const folio = await Folio.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (!folio) {
    return res.status(404).json({ error: "Folio tidak ditemukan" });
  }
  res.status(200).json(folio);
};

module.exports = {
  createFolio,
  getFolio,
  getFolios,
  deleteFolio,
  updateFolio,
  searchFolio,
};
