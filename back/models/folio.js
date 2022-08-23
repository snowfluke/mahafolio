// @ts-check-ignore

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { FOLIO_CATEGORIES } = require("../utils/constant");

const folioSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Judul tidak boleh kosong!"],
      minLength: 5,
      maxLength: [70, "Jumlah judul melebihi 70 karakter!"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Mahasiswa",
      required: true,
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
      required: [true, "Semester tidak boleh kosong!"],
      min: [1, "Semester {VALUE} tidak valid!"],
      max: [16, "Semester {VALUE} tidak valid!"],
    },
    subject: {
      type: String,
      required: [true, "Mata kuliah tidak boleh kosong!"],
      minLength: [3, "Panjang mata kuliah minimal 3 karakter!"],
      maxLength: [30, "Panjang {VALUE} melebihi 30 karakter!"],
    },
    fileId: {
      type: String,
    },
    url: {
      type: String,
      required: true,
      minLength: 5,
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
