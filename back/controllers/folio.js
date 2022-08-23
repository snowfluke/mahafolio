// @ts-check-ignore

const validator = require("validator").default;
const { uploadFile, searchFolder, deleteFile } = require("../apis/gdrive");
const Folio = require("../models/folio");
const Mahasiswa = require("../models/mahasiswa");
const { SCORING } = require("../utils/constant");
const formidable = require("formidable");

const form = formidable({
  maxFileSize: 2 * 1024 * 1024,
});

// get all Folio
const getFolios = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validator.isMongoId(id)) {
      throw Error("ID mahasiswa tidak valid");
    }
    const folios = await Folio.find({ author: id }).sort({ createdAt: -1 });
    res.status(200).json(folios);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// get 1 Folio
const getFolio = async (req, res) => {
  const { id } = req.params;
  try {
    if (!validator.isMongoId(id)) {
      throw Error("ID folio tidak valid");
    }

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
  try {
    form.parse(req, async (err, fields, files) => {
      try {
        if (err) throw Error(err.message);

        const { file } = files;
        const { title, type, semester, subject, url, description, author } =
          fields;

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
          const newFile = await uploadFile(filename, file.filepath, [
            folder.id,
          ]);

          data.url = newFile.link;
          data.fileId = newFile.id;
        }

        let folioScore = SCORING[type]();

        const folio = await Folio.create({
          title,
          type,
          semester,
          subject,
          description,
          author,
          ...data,
          score: folioScore,
        });

        await Mahasiswa.findOneAndUpdate(
          { _id: author },
          { $inc: { score: folioScore } }
        );

        res.status(200).json(folio);
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error: error.message || "Terjadi kesalahan server internal",
        });
      }
    });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// delete a Folio
const deleteFolio = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// search a Folio
const searchFolio = async (req, res) => {
  const { keyword } = req.params;
  try {
    if (keyword.length < 3 || keyword.length > 15) {
      throw Error("Kata kunci hanya 3-15 karakter!");
    }

    const folios = await Folio.find({
      title: { $regex: keyword.trim(), $options: "i" },
      subject: { $regex: keyword.trim(), $options: "i" },
      description: { $regex: keyword.trim(), $options: "i" },
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
  try {
    if (!validator.isMongoId(id)) throw Error("ID folio tidak valid");

    form.parse(req, async (err, fields, files) => {
      try {
        if (err) throw Error(err.message);

        const { file } = files;
        const update = fields;

        if (!update.type) throw Error("Tipe tidak boleh kosong!");
        if (!update.semester) throw Error("Semester tidak boleh kosong!");

        if (update.url && !validator.isURL(update.url))
          throw Error("Link tidak valid!");

        delete update.author;
        let data = {};

        if (update.url) data.url = update.url;

        if (file) {
          if (!update.fileId) throw Error("File id tidak valid");

          let folderName = update.semester + "@" + req.mhs.email;
          const folder = await searchFolder(folderName, [req.mhs.folderId]);
          await deleteFile(update.fileId);

          let filename = Date.now() + "_" + file.originalFilename;
          const newFile = await uploadFile(filename, file.filepath, [
            folder.id,
          ]);

          data.url = newFile.link;
          data.fileId = newFile.id;
        }

        let newScore = SCORING[update.type]();
        let newFolio = { ...update, ...data, score: newScore };

        const folio = await Folio.findOneAndUpdate({ _id: id }, newFolio);

        if (!folio)
          return res.status(404).json({ error: "Folio tidak ditemukan" });

        await Mahasiswa.findOneAndUpdate(
          { _id: folio.author },
          { $inc: { score: newScore - folio.score } }
        );

        res.status(200).json({ ...folio.toJSON(), ...newFolio });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          error: error.message || "Terjadi kesalahan server internal",
        });
      }
    });
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
