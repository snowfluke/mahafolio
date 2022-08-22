// @ts-check-ignore

const validator = require("validator").default;
const Folio = require("../models/folio");
const Mahasiswa = require("../models/mahasiswa");
const { SCORING } = require("../utils/constant");

// get all Folio
const getFolios = async (req, res) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    return res.status(400).json({ error: "ID mahasiswa tidak valid" });
  }
  const folios = await Folio.find({ author: id }).sort({ createdAt: -1 });
  res.status(200).json(folios);
};

// get 1 Folio
const getFolio = async (req, res) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    return res.status(400).json({ error: "ID folio tidak valid" });
  }

  try {
    const folio = await Folio.findById(id);
    if (!folio) {
      return res.status(404).json({ error: "Folio tidak ditemukan" });
    }

    res.status(200).json(folio);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// create a new Folio
const createFolio = async (req, res) => {
  const { title, type, semester, subject, url, description, author } = req.body;
  try {
    if (!validator.isMongoId(author)) throw Error("Author tidak valid!");
    if (!validator.isURL(url)) throw Error("Link tidak valid!");

    const folio = await Folio.create({
      title,
      type,
      semester,
      subject,
      url,
      description,
      author,
      score: SCORING[type],
    });

    await Mahasiswa.findOneAndUpdate(
      { _id: author },
      { $inc: { score: SCORING[type] } }
    );

    res.status(200).json(folio);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// delete a Folio
const deleteFolio = async (req, res) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    return res.status(400).json({ error: "ID folio tidak valid" });
  }

  const folio = await Folio.findOneAndDelete({ _id: id });
  if (!folio) {
    return res.status(404).json({ error: "Folio tidak ditemukan" });
  }

  await Mahasiswa.findOneAndUpdate(
    { _id: folio.author },
    { $inc: { score: -folio.score } }
  );

  res.status(200).json(folio);
};

// search a Folio
const searchFolio = async (req, res) => {
  const { keyword } = req.params;
  if (keyword.length < 3 || keyword.length > 15) {
    return res.status(400).json({ error: "Kata kunci hanya 3-15 karakter!" });
  }
  try {
    const folios = await Folio.find({
      title: { $regex: keyword.trim(), $options: "i" },
    });
    if (!folios) {
      return res.status(404).json({ error: "Folio tidak ditemukan" });
    }

    res.status(200).json(folios);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// update a folio
const updateFolio = async (req, res) => {
  const { id } = req.params;
  const update = req.body;

  if (!validator.isMongoId(id)) {
    return res.status(400).json({ error: "ID folio tidak valid" });
  }

  delete update.author;
  try {
    if (!update.type || !update.url)
      throw Error("Tipe atau Link tidak boleh kosong!");
    if (!validator.isURL(update.url)) throw Error("Link tidak valid!");

    const folio = await Folio.findOneAndUpdate(
      { _id: id },
      { ...update, score: SCORING[update.type] },
      { new: true }
    );

    if (!folio) {
      return res.status(404).json({ error: "Folio tidak ditemukan" });
    }

    res.status(200).json(folio);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createFolio,
  getFolio,
  getFolios,
  deleteFolio,
  updateFolio,
  searchFolio,
};
