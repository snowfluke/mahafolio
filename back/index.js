// @ts-check
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { xss } = require("express-xss-sanitizer");
const mongoose = require("mongoose");
const app = express();

// Routes import
const routerMahasiswa = require("./routes/mahasiswa");
const routerFolio = require("./routes/folio");
const routerPhoto = require("./routes/photo");
const routerAdmin = require("./routes/admin");
const origin = require("./middlewares/origin");

const PORT = process.env.PORT || 4000;

// Middlewares
app.use(
  express.json({
    limit: "1mb",
  })
);

app.use(cors(), origin);
app.use(xss());

// Routes
app.use("/api/photo", routerPhoto);
app.use("/api/mahasiswa", routerMahasiswa);
app.use("/api/folio", routerFolio);
app.use("/api/admin", routerAdmin);

// Connect to DB

mongoose
  .connect(process.env.MONGO_URI || "")
  .then(() => {
    // Listener
    app.listen(PORT, () =>
      console.log("Server and Database Running on port " + PORT)
    );
  })
  .catch((err) => console.log(err));
