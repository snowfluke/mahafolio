// @ts-check-ignore

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { STUDY } = require("../utils/constant");
const { customAlphabet } = require("nanoid");
const validator = require("validator").default;

const Schema = mongoose.Schema;

const mhsSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    salt: String,
    password: {
      type: String,
      required: true,
    },
    nim: {
      type: String,
      unique: true,
      minLength: 4,
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
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
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

  const userExist = await this.findOne({ email });
  if (userExist) {
    throw Error("Email telah dipakai!");
  }

  const salt = await bcrypt.genSalt(10);
  const randomName = "Anonim#" + customAlphabet("1234567890", 4)();
  const nim = customAlphabet("1234567890", 12)();
  const hash = await bcrypt.hash(password, salt);

  const user = this.create({
    email,
    password: hash,
    salt,
    nim,
    name: randomName,
  });

  return user;
};

module.exports = mongoose.model("Mahasiswa", mhsSchema);
