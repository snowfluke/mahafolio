// @ts-check-ignore
const jwt = require("jsonwebtoken");
const Mahasiswa = require("../models/mahasiswa");

async function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token Autorisasi diperlukan!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.APP_SECRET);

    req.mhs = await Mahasiswa.findOne({ _id }).select("_id folderId email");
    next();
  } catch (error) {
    res.status(401).json({ error: "Akses tidak legal!" });
  }
}

module.exports = auth;
