// @ts-check-ignore
const validator = require("validator").default;
const jwt = require("jsonwebtoken");
const { sendMail } = require("../apis/mailer");

const Mahasiswa = require("../models/mahasiswa");

function createToken(_id, email, password, folderId) {
  return jwt.sign({ _id, email, password, folderId }, process.env.APP_SECRET, {
    expiresIn: "3d",
  });
}

function createResetToken(_id, email, password) {
  return jwt.sign({ _id, email, password }, process.env.APP_SECRET + password, {
    expiresIn: "15m",
  });
}

// sign in mhs
const signinMhs = async (req, res) => {
  const { email, password } = req.body;

  try {
    const mhs = await Mahasiswa.signin(email, password);
    const token = createToken(mhs._id, mhs.email, mhs.password, mhs.folderId);

    res.status(200).json({ email, token, _id: mhs._id });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

// sign up mhs
const signupMhs = async (req, res) => {
  const { email, password } = req.body;

  try {
    const mhs = await Mahasiswa.signup(email, password);
    const token = createToken(mhs._id, mhs.email, mhs.password, mhs.folderId);

    res.status(200).json({ email, token, _id: mhs._id });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

// get 1 mhs
const getMhs = async (req, res) => {
  const { id } = req.params;
  try {
    if (!validator.isMongoId(id)) throw Error("Mahasiswa tidak ditemukan");

    const mhs = await Mahasiswa.findById(id).select(
      "email score name bio study semester nim _id"
    );
    if (!mhs) {
      return res.status(404).json({ error: "Mahasiswa tidak ditemukan" });
    }

    res.status(200).json(mhs);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

// search mhs
const searchMhs = async (req, res) => {
  const { keyword } = req.params;
  try {
    if (keyword.length < 3 || keyword.length > 15)
      throw Error("Kata kunci hanya 3-15 karakter!");

    const query = keyword.trim();
    const mhss = await Mahasiswa.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { nim: { $regex: query, $options: "i" } },
      ],
    })
      .sort({ createdAt: -1 })
      .skip(0)
      .limit(50)
      .select("_id name nim createdAt");
    if (!mhss) {
      return res.status(404).json({ error: "Mahasiswa tidak ditemukan" });
    }

    res.status(200).json(mhss);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

// update 1 mhs
const updateMhs = async (req, res) => {
  const { id } = req.params;

  try {
    if (id !== req.mhs._id.toString()) throw Error("Akses ilegal!");
    if (!validator.isMongoId(id)) throw Error("ID mahasiswa tidak valid");

    let update = req.body;

    delete update.password;
    delete update.score;

    const mhs = await Mahasiswa.findOneAndUpdate(
      { _id: id },
      {
        ...update,
      },
      { new: true }
    ).select("email score name bio study semester nim _id");

    if (!mhs) {
      return res.status(404).json({ error: "Mahasiswa tidak ditemukan" });
    }
    res.status(200).json(mhs);
  } catch (error) {
    if (11000 === error.code || 11001 === error.code)
      return res.status(200).json({ error: "NIM atau email telah dipakai!" });
    return res.status(200).json({ error: error.message });
  }
};

// get 10 leaderboard
const getLeaderboard = async (req, res) => {
  const { study, semester } = req.query;

  try {
    const keyword = {};
    if (study) keyword.study = study;
    if (semester) keyword.semester = parseInt(semester);

    const mhs = await Mahasiswa.find(keyword)
      .sort({ score: -1 })
      .skip(0)
      .limit(10)
      .select("_id name score study semester");
    if (!mhs) {
      return res.status(404).json({ error: "Mahasiswa tidak ditemukan" });
    }

    res.status(200).json(mhs);
  } catch (error) {
    return res.status(200).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) throw Error("Permintaan tidak valid!");

    const mhs = await Mahasiswa.findOne({ email }).select("_id email password");
    if (!mhs) {
      throw Error("Mahasiswa tidak terdaftar");
    }

    const token = createResetToken(mhs._id, mhs.email, mhs.password);
    const link = `${process.env.DOMAIN}/lupa-sandi?id=${mhs._id}&token=${token}`;
    console.log(link);

    const mail = await sendMail(
      mhs.email,
      "Atur ulang kata sandi",
      `Untuk mengatur ulang kata sandimu, silakan klik pada tautan berikut: ${link}.
    
    
Catatan: Apabila kamu tidak merasa mengatur ulang kata sandi, silakan abaikan email ini.`
    );
    res.status(200).json(mail);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = {
  signinMhs,
  signupMhs,
  getMhs,
  searchMhs,
  updateMhs,
  getLeaderboard,
  forgotPassword,
};
