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

// get 1 Folio by mhs id
const getFolios = async (req, res) => {
  try {
    const { id } = req.params;
    if (!validator.isMongoId(id)) {
      throw Error("ID mahasiswa tidak valid");
    }
    const folios = await Folio.find({ author: id })
      .sort({ createdAt: -1 })
      .skip(0)
      .limit(1)
      .select("_id title type");
    res.status(200).json(folios);
  } catch (error) {
    return res.status(200).json({ error: error.message });
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
    return res.status(200).json({ error: error.message });
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

        if (author !== req.mhs._id.toString()) throw Error("Akses ilegal!");
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
        return res.status(500).json({
          error: error.message || "Terjadi kesalahan server internal",
        });
      }
    });
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

// delete a Folio
const deleteFolio = async (req, res) => {
  try {
    const { id, author } = req.params;
    if (author !== req.mhs._id.toString()) throw Error("Akses ilegal!");

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
    return res.status(200).json({ error: error.message });
  }
};

// search a Folio
const searchFolio = async (req, res) => {
  const { q, mahasiswa, semester, type } = req.query;
  try {
    if (!mahasiswa || !validator.isMongoId(mahasiswa))
      throw Error("ID mahasiswa tidak valid");

    if (!q || q.length < 3 || q.length > 25) {
      throw Error("Kata kunci terdiri dari 3-25 karakter!");
    }

    const search = { author: mahasiswa };
    if (semester) search.semester = parseInt(semester);
    if (type) search.type = type;

    const folios = await Folio.find({
      search,
      $or: [
        { title: { $regex: q.trim(), $options: "i" } },
        { subject: { $regex: q.trim(), $options: "i" } },
        { description: { $regex: q.trim(), $options: "i" } },
      ],
    });
    if (!folios) {
      return res.status(404).json({ error: "Folio tidak ditemukan" });
    }

    res.status(200).json(folios);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

// update a folio
const updateFolio = async (req, res) => {
  const { id, author } = req.params;
  try {
    if (author !== req.mhs._id.toString()) throw Error("Akses ilegal!");
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
        return res.status(500).json({
          error: error.message || "Terjadi kesalahan server internal",
        });
      }
    });
  } catch (error) {
    return res.status(error.code || 200).json({ error: error.message });
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
