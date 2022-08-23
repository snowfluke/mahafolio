// @ts-check-ignore

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
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

adminSchema.statics.signin = async function (email, password) {
  if (!email || !password) {
    throw Error("Email atau password tidak boleh kosong!");
  }

  const admin = await this.findOne({ email });
  if (!admin) {
    throw Error("Email atau kata sandi salah!");
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    throw Error("Email atau kata sandi salah!");
  }

  return admin;
};

module.exports = mongoose.model("Admin", adminSchema);
