// @ts-check-ignore
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const Mahasiswa = require("../models/mahasiswa");

function createToken(_id) {
  return jwt.sign({ _id }, process.env.APP_SECRET, { expiresIn: "3d" });
}

const signinMhs = async (req, res) => {
  const { email, password } = req.body;

  try {
    res.status(200).json({ message: "berhasil signin" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupMhs = async (req, res) => {
  const { email, password } = req.body;

  try {
    const mhs = await Mahasiswa.signup(email, password);
    const token = createToken(mhs._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteMhs = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "ID mahasiswa tidak valid" });
  }

  const mhs = await Mahasiswa.findOneAndDelete({ _id: id });
  if (!mhs) {
    return res.status(404).json({ error: "Mahasiswa tidak ditemukan" });
  }

  res.status(200).json(mhs);
};

module.exports = {
  signinMhs,
  signupMhs,
  deleteMhs,
};
