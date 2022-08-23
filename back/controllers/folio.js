// @ts-check-ignore

const validator = require("validator").default;
const { uploadFile, searchFolder, deleteFile } = require("../apis/gdrive");
const Folio = require("../models/folio");
const Mahasiswa = require("../models/mahasiswa");
const { SCORING } = require("../utils/constant");
const formidable = require("formidable");

// get all Folio
const getFolios = async (req, res) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    throw Error("ID mahasiswa tidak valid");
  }
  const folios = await Folio.find({ author: id }).sort({ createdAt: -1 });
  res.status(200).json(folios);
};

// get 1 Folio
const getFolio = async (req, res) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    throw Error("ID folio tidak valid");
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
  const form = formidable({});

  form.parse(req, async (err, fields, files) => {
    if (err) {
      throw err;
    }

    const { file } = files;
    const { title, type, semester, subject, url, description, author } = fields;

    try {
      if (!validator.isMongoId(author)) throw Error("Author tidak valid!");
      if (!url && !file) throw Error("Link atau File diperlukan!");
      if (url && !validator.isURL(url)) throw Error("Link tidak valid!");

      let data = {
        url: url,
      };

      if (file) {
        let folderName = semester + "@" + req.mhs.email;
        const folder = await searchFolder(folderName, [req.mhs.folderId]);

        let filename = Date.now() + "_" + file.originalFilename;
        const newFile = await uploadFile(filename, file.filepath, [folder.id]);

        data.url = newFile.link;
        data.fileId = newFile.id;
      }

      const folio = await Folio.create({
        title,
        type,
        semester,
        subject,
        description,
        author,
        ...data,
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
  });
};

// delete a Folio
const deleteFolio = async (req, res) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    throw Error("ID folio tidak valid");
  }

  const folio = await Folio.findOneAndDelete({ _id: id });
  if (!folio) {
    return res.status(404).json({ error: "Folio tidak ditemukan" });
  }

  if (folio.fileId) {
    await deleteFile(folio.fileId);
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
    throw Error("Kata kunci hanya 3-15 karakter!");
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
    throw Error("ID folio tidak valid");
  }

  delete update.author;
  try {
    if (!update.type) throw Error("Tipe tidak boleh kosong!");
    if (!update.file && !update.url)
      throw Error("File atau Link tidak boleh kosong!");

    if (update.url && !validator.isURL(update.url))
      throw Error("Link tidak valid!");

    let files = {
      url: update.url || "",
    };

    if (update.file) {
      let folderName = semester + "@" + req.mhs.email;
      const folder = await searchFolder(folderName);

      await deleteFile(update.fileId);
      const newFile = await uploadFile({}, {}, [folder.id]);

      files.url = newFile.link;
      files.fileId = newFile.id;
    }

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
    return res.status(error.code || 400).json({ error: error.message });
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
