require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

// Routes import
const routerMahasiswa = require("./routes/mahasiswa");
const routerFolio = require("./routes/folio");

const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://localhost:3001"],
//   })
// );

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/mahasiswa", routerMahasiswa);
app.use("/api/folio", routerFolio);

// Connect to DB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listener
    app.listen(PORT, () => console.log("DB & Server Running on port " + PORT));
  })
  .catch((err) => console.log(err));
