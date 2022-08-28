// @ts-check-ignore
const validator = require("validator").default;
const Mahasiswa = require("../models/mahasiswa");

// get 1 pre render base64 photo
const getPhoto = async (req, res) => {
  const { id } = req.params;
  try {
    if (!validator.isMongoId(id)) throw Error("Mahasiswa tidak ditemukan");

    const mhs = await Mahasiswa.findById(id).select("photo");

    if (!mhs) {
      return res.status(404).json({ error: "Mahasiswa tidak ditemukan" });
    }

    if (!mhs.photo)
      return res.status(404).json({ error: "Foto Mahasiswa tidak ditemukan" });

    const img = new Buffer.from(mhs.photo.split(",")[1], "base64");
    const mimeType = mhs.photo.split(",")[0].split(";")[0].split(":")[1];

    res.writeHead(200, {
      "Content-Type": mimeType,
      "Content-Length": img.length,
    });
    res.end(img);
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getPhoto,
};
