const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { FOLIO_CATEGORIES } = require("../utils/constant");

const folioSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Judul tidak boleh kosong!"],
      maxLength: [70, "Jumlah judul melebihi 70 karakter!"],
    },
    type: {
      type: String,
      enum: {
        values: FOLIO_CATEGORIES,
        message: "Kategori {VALUE} tidak valid!",
      },
      required: [true, "Kategori tidak boleh kosong!"],
    },
    semester: {
      type: Number,
      min: [1, "Semester {VALUE} tidak valid!"],
      max: [16, "Semester {VALUE} tidak valid!"],
    },
    subject: {
      type: String,
      required: [true, "Mata kuliah tidak boleh kosong!"],
      maxLength: [30, "Panjang {VALUE} melebihi 30 karakter!"],
    },
    url: {
      type: String,
      required: [true, "Link tidak boleh kosong!"],
      minLength: [5, "Link {VALUE} terlalu pendek!"],
    },
    description: {
      type: String,
      maxLength: [200, "Panjang deskripsi maksimal 200 karakter!"],
    },
    score: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Folio", folioSchema);
