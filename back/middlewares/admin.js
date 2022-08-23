// @ts-check-ignore
const jwt = require("jsonwebtoken");

async function admin(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token Autorisasi diperlukan!" });
  }

  const token = authorization.split(" ")[1];

  try {
    const { _id } = jwt.verify(token, process.env.ADMIN_APP_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ error: "Akses ilegal!" });
  }
}

module.exports = admin;
