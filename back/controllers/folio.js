// @ts-check-ignore

const validator = require("validator").default;
const { uploadFile, searchFolder, deleteFile } = require("../apis/gdrive");
const Folio = require("../models/folio");
const Mahasiswa = require("../models/mahasiswa");
const { SCORING, FOLIO_CATEGORIES } = require("../utils/constant");
const formidable = require("formidable");
const { default: mongoose } = require("mongoose");

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
      .select("_id title type updatedAt");
    res.status(200).json(folios);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

// get 1 Folio by id folio
const getFolio = async (req, res) => {
  const { id } = req.params;
  try {
    if (!validator.isMongoId(id)) {
      throw Error("ID folio tidak valid");
    }

    const folio = await Folio.findById(id)
      .select(
        "_id title fileId description subject semester type url createdAt updatedAt author"
      )
      .populate({ path: "author", select: "_id name" });
    if (!folio) {
      return res.status(404).json({ error: "Folio tidak ditemukan" });
    }

    res.status(200).json(folio);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

// get 1 Folio stats by mhs id and by semester
const getFolioStats = async (req, res) => {
  const { id } = req.params;
  const { semester } = req.query;
  try {
    if (!validator.isMongoId(id)) {
      throw Error("ID mahasiswa tidak valid");
    }

    const queries = {
      author: mongoose.Types.ObjectId(id),
    };

    if (semester) {
      queries["$or"] = [
        {
          semester: parseInt(semester) - 1,
        },
        {
          semester: parseInt(semester),
        },
      ];
    }

    const agg = await Folio.aggregate([
      {
        $match: queries,
      },
      {
        $group: {
          _id: {
            semester: "$semester",
            type: "$type",
          },
          total: {
            $count: {},
          },
        },
      },
      {
        $group: {
          _id: "$_id.semester",
          stats: {
            $push: {
              type: "$_id.type",
              total: "$total",
            },
          },
        },
      },
    ]);

    if (!agg.length) {
      return res.status(404).json({ error: "Belum ditemukan kemajuan" });
    }
    let stats = agg;
    if (agg.length == 1) {
      if (agg[0]._id == semester) {
        stats.push({
          stats: [{ total: 0 }],
          _id: parseInt(semester) - 1,
        });
      } else {
        return res.status(404).json({ error: "Belum ditemukan kemajuan" });
      }
    }
    stats = agg.sort((a, b) => a._id - b._id);

    const formattedStats = {
      semester,
      total: 0,
      stats: [],
      previousTotal: stats[0].stats.reduce(
        (prev, curr) => ({ total: prev.total + curr.total }),
        { total: 0 }
      ).total,
    };

    for (let i = 0; i < FOLIO_CATEGORIES.length; i++) {
      let key = FOLIO_CATEGORIES[i];
      let val = stats[1].stats.find((el) => el.type == key)?.total || 0;
      formattedStats.stats.push({ name: key, total: val });
      formattedStats.total += val;
    }

    res.status(200).json(formattedStats);
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

        const fjson = folio.toJSON();
        const returnedValue = {
          title: fjson.title,
          _id: fjson._id,
          createdAt: fjson.createdAt,
          author: fjson.author,
        };

        res.status(200).json(returnedValue);
      } catch (error) {
        return res.status(400).json({
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
    const { id } = req.params;
    if (!validator.isMongoId(id)) {
      throw Error("ID folio tidak valid");
    }

    const folio = await Folio.findOneAndDelete({
      _id: id,
      author: req.mhs._id.toString(),
    });
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

    res.status(200).json({ status: "Folio successfully deleted" });
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

    if (q.length > 25) {
      throw Error("Kata kunci tidak boleh lebih dari 25 karakter!");
    }

    const search = { author: mahasiswa };
    if (semester) search.semester = parseInt(semester);
    if (type) search.type = type;

    const folios = await Folio.find({
      $or: [
        { title: { $regex: q.trim(), $options: "i" } },
        { subject: { $regex: q.trim(), $options: "i" } },
        { description: { $regex: q.trim(), $options: "i" } },
      ],
      $and: [search],
    })
      .sort({ updatedAt: -1 })
      .skip(0)
      .limit(50)
      .select("_id updatedAt title type");
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
  const { id } = req.params;
  try {
    if (!validator.isMongoId(id)) throw Error("ID folio tidak valid");

    form.parse(req, async (err, fields, files) => {
      try {
        if (err) throw Error(err.message);

        const { file } = files;
        const { title, description, subject, type, semester, url, author } =
          fields;

        if (author !== req.mhs._id.toString()) throw Error("Akses ilegal!");

        if (!type) throw Error("Tipe tidak boleh kosong!");
        if (!semester) throw Error("Semester tidak boleh kosong!");

        if (url && !validator.isURL(url)) throw Error("Link tidak valid!");

        const oldFolio = await Folio.findOne({ _id: id });
        if (!oldFolio)
          return res.status(404).json({ error: "Folio tidak ditemukan" });

        const data = {};

        if (url && url !== oldFolio.url) {
          data.url = url;
          if (!file && oldFolio.fileId) {
            await deleteFile(oldFolio.fileId);
            data.fileId = "";
          }
        }

        if (file) {
          let folderName = semester + "@" + req.mhs.email;
          const folder = await searchFolder(folderName, [req.mhs.folderId]);

          let filename = Date.now() + "_" + file.originalFilename;
          const newFile = await uploadFile(filename, file.filepath, [
            folder.id,
          ]);

          if (oldFolio.fileId) {
            await deleteFile(oldFolio.fileId);
          }

          data.url = newFile.link;
          data.fileId = newFile.id;
        }

        let newScore = SCORING[type]();
        const folio = await Folio.findOneAndUpdate(
          { _id: id },
          {
            title: title || oldFolio.title,
            description: description || oldFolio.description,
            subject: subject || oldFolio.subject,
            semester: semester || oldFolio.semester,
            type: type || oldFolio.type,
            ...data,
            score: newScore,
          },
          { new: true }
        ).select("title _id author updatedAt");

        if (!folio)
          return res.status(404).json({ error: "Folio tidak ditemukan" });

        await Mahasiswa.findOneAndUpdate(
          { _id: folio.author },
          { $inc: { score: newScore - oldFolio.score } }
        );

        res.status(200).json(folio);
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
  getFolioStats,
};
