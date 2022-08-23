// @ts-check-ignore
const validator = require("validator").default;
const jwt = require("jsonwebtoken");
const { deleteFile } = require("../apis/gdrive");

const Admin = require("../models/admin");
const Mahasiswa = require("../models/mahasiswa");

function createToken(_id) {
  return jwt.sign({ _id }, process.env.ADMIN_APP_SECRET, { expiresIn: "1d" });
}

// sign in admin
const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const mhs = await Admin.signin(email, password);
    const token = createToken(mhs._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete 1 mhs
const adminDeleteMhs = async (req, res) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) throw Error("ID mahasiswa tidak valid");

  try {
    const mhs = await Mahasiswa.findOneAndDelete({ _id: id });
    if (!mhs) {
      return res.status(404).json({ error: "Mahasiswa tidak ditemukan" });
    }

    await deleteFile(mhs.folderId);

    res.status(200).json(mhs);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  adminLogin,
  adminDeleteMhs,
};
