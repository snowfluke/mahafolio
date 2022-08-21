require("dotenv").config();

const express = require("express");
const cors = require("cors");
const routerMahasiswa = require("./routes/mahasiswa");
const routerFolio = require("./routes/folio");

const PORT = process.env.PORT || 4000;
// App
const app = express.app();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
  })
);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use("/api/mahasiswa" + routerMahasiswa);
app.use("/api/folio" + routerFolio);

// Listener
app.listen(PORT, () => console.log("listening on port " + PORT));
