// @ts-check-ignore

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { STUDY } = require("../utils/constant");
const { customAlphabet } = require("nanoid");
const { searchFolder } = require("../apis/gdrive");
const validator = require("validator").default;

const Schema = mongoose.Schema;

const mhsSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    folderId: {
      type: String,
      required: true,
    },
    nim: {
      type: String,
      unique: true,
      minLength: 4,
      required: true,
      maxLength: 12,
    },
    name: {
      type: String,
      minLength: 3,
      maxLength: 25,
      required: true,
    },
    study: {
      type: String,
      enum: STUDY,
      default: STUDY[0],
    },
    semester: {
      type: Number,
      required: true,
      min: 1,
      max: 16,
      default: 1,
    },
    bio: {
      type: String,
      minLength: 10,
      required: true,
      maxLength: 200,
      default: "Bio berisi 10-200 karakter",
    },
    photo: {
      type: String,
      default: "",
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

// statics method
mhsSchema.statics.signup = async function (email, password) {
  if (!email || !password) {
    throw Error("Email atau password tidak boleh kosong!");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email tidak valid!");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Kata sandi kurang kuat! Gunakan kombinasi angka, huruf, simbol dan lebih dari 8 karakter!"
    );
  }

  const exist = await this.findOne({ email });
  if (exist) {
    throw Error("Email telah dipakai!");
  }

  const salt = await bcrypt.genSalt(10);
  const randomName = "Anonim#" + customAlphabet("1234567890", 4)();
  const nim = customAlphabet("1234567890", 12)();
  const hash = await bcrypt.hash(password, salt);

  const folder = await searchFolder(email);

  const user = this.create({
    email,
    password: hash,
    nim,
    folderId: folder.id,
    name: randomName,
  });

  return user;
};

mhsSchema.statics.signin = async function (email, password) {
  if (!email || !password) {
    throw Error("Email atau password tidak boleh kosong!");
  }

  const mhs = await this.findOne({ email });
  if (!mhs) {
    throw Error("Email atau kata sandi salah!");
  }

  const match = await bcrypt.compare(password, mhs.password);
  if (!match) {
    throw Error("Email atau kata sandi salah!");
  }

  return mhs;
};

module.exports = mongoose.model("Mahasiswa", mhsSchema);
