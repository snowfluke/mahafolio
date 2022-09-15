import { object, string, number } from "yup";
import { STUDY_NAME, TYPE_NAME } from "../utils/constant";

const errors = {
  min: (n, x) => `Panjang ${x} minimal ${n} karakter!`,
  max: (n, x) => `Panjang ${x} maksimal ${n} karakter!`,
  req: (x) => `${x} wajib diisi!`,
  email: "Masukkkan email yang valid!",
  semester: (n, x) => `Semester ${x} adalah semester ${n}`,
  password: {
    matches:
      "Kata sandi harus terdiri setidaknya 8 karakter, huruf kapital, huruf kecil, angka dan karakter spesial!",
  },
};

export const passwordSchema = object({
  password: string()
    .required(errors.req("Kata sandi"))
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      errors.password.matches
    ),
  password2: string()
    .required(errors.req("Kata sandi"))
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      errors.password.matches
    ),
});

export const loginSchema = object({
  email: string().email(errors.email).required(errors.req("Email")),
  password: string()
    .required(errors.req("Kata sandi"))
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      errors.password.matches
    ),
});

export const searchSchema = object({
  keyword: string()
    .min(3, errors.min(3, "kata kunci mahasiswa"))
    .max(15, errors.max(15, "kata kunci mahasiswa"))
    .required(errors.req("Kata kunci mahasiswa")),
});

export const folioSearchSchema = object({
  q: string().max(25, errors.max(25, "Kata kunci")),
});

export const updateProfileSchema = object({
  name: string()
    .min(3, errors.min(3, "nama"))
    .max(25, errors.max(25, "nama"))
    .required(errors.req("Nama")),
  email: string().email(errors.email).required(errors.req("Email")),
  semester: number()
    .min(1, errors.semester("minimal", 1))
    .max(14, errors.semester("maksimal", 14))
    .required(errors.req("Semester")),
  study: string().oneOf(STUDY_NAME).required(errors.req("Program studi")),
  bio: string()
    .min(10, errors.min(10, "bio"))
    .max(200, errors.max(200, "bio"))
    .required(errors.req("Bio")),
  nim: string()
    .min(4, errors.min(4, "NIM"))
    .max(12, errors.max(12, "NIM"))
    .required(errors.req("NIM")),
});

export const folioSchema = object({
  title: string()
    .min(5, errors.min(5, "judul"))
    .max(70, errors.max(70, "judul"))
    .required(errors.req("Judul")),
  description: string().max(200, errors.max(200, "deskripsi")),
  subject: string()
    .min(3, errors.min(3, "mata kuliah"))
    .max(30, errors.max(30, "mata kuliah"))
    .required(errors.req("Mata kuliah")),
  semester: number()
    .min(1, errors.semester("minimal", 1))
    .max(14, errors.semester("maksimal", 14))
    .required(errors.req("Semester")),
  type: string().oneOf(TYPE_NAME).required(errors.req("Jenis folio")),
  url: string().url("URL tidak valid!"),
});
