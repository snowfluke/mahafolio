// @ts-check-ignore
const validator = require("validator").default;
const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");

const Mahasiswa = require("../models/mahasiswa");

function createToken(_id) {
  return jwt.sign({ _id }, process.env.APP_SECRET, { expiresIn: "3d" });
}

// sign in mhs
const signinMhs = async (req, res) => {
  const { email, password } = req.body;

  try {
    const mhs = await Mahasiswa.signin(email, password);
    const token = createToken(mhs._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// sign up mhs
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

// get 1 mhs
const getMhs = async (req, res) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    return res.status(400).json({ error: "ID mahasiswa tidak valid" });
  }

  try {
    const mhs = await Mahasiswa.findById(id);
    if (!mhs) {
      return res.status(404).json({ error: "Mahasiswa tidak ditemukan" });
    }

    res.status(200).json(mhs);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// search mhs
const searchMhs = async (req, res) => {
  const { keyword } = req.params;
  if (keyword.length < 3 || keyword.length > 15) {
    return res.status(400).json({ error: "Kata kunci hanya 3-15 karakter!" });
  }

  try {
    const query = keyword.trim();
    const mhss = await Mahasiswa.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { nim: { $regex: query, $options: "i" } },
      ],
    });
    if (!mhss) {
      return res.status(404).json({ error: "Mahasiswa tidak ditemukan" });
    }

    res.status(200).json(mhss);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// update 1 mhs
const updateMhs = async (req, res) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    return res.status(404).json({ error: "ID mahasiswa tidak valid" });
  }

  let update = req.body;

  delete update.email;
  delete update.password;

  try {
    const mhs = await Mahasiswa.findOneAndUpdate(
      { _id: id },
      {
        ...update,
      },
      { new: true }
    );
    if (!mhs) {
      return res.status(404).json({ error: "Mahasiswa tidak ditemukan" });
    }
    res.status(200).json(mhs);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

// delete 1 mhs
const deleteMhs = async (req, res) => {
  const { id } = req.params;
  if (!validator.isMongoId(id)) {
    return res.status(404).json({ error: "ID mahasiswa tidak valid" });
  }

  try {
    const mhs = await Mahasiswa.findOneAndDelete({ _id: id });
    if (!mhs) {
      return res.status(404).json({ error: "Mahasiswa tidak ditemukan" });
    }

    res.status(200).json(mhs);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getLeaderboard = async (req, res) => {
  try {
    const mhs = await Mahasiswa.find({}).sort({ score: -1 }).skip(0).limit(10);
    if (!mhs) {
      return res.status(404).json({ error: "Mahasiswa tidak ditemukan" });
    }

    res.status(200).json(mhs);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signinMhs,
  signupMhs,
  deleteMhs,
  getMhs,
  searchMhs,
  updateMhs,
  getLeaderboard,
};
