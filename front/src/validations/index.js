import { object, string, number } from "yup";
import { STUDY_NAME } from "../utils/constant";

const errors = {
  min: (n, x) => `Panjang ${x} minimal ${n} karakter!`,
  max: (n, x) => `Panjang ${x} maksimal ${n} karakter!`,
  req: (x) => `${x} wajib diisi!`,
  email: "Masukkkan email yang valid!",
  semester: (n, x) => `Semester ${x} adalah ${n}`,
  password: {
    matches:
      "Kata sandi harus terdiri setidaknya 8 karakter, huruf kapital, huruf kecil, angka dan karakter spesial!",
  },
};

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
    .min(3, errors.min(3, "Kata kunci mahasiswa"))
    .max(15, errors.max(15, "Kata kunci mahasiswa"))
    .required(errors.req("Kata kunci mahasiswa")),
});

export const folioSearchSchema = object({
  q: string()
    .min(3, errors.min(3, "Kata kunci"))
    .max(25, errors.max(25, "Kata kunci"))
    .required(errors.req("Kata kunci")),
});

export const updateProfileSchema = object({
  name: string()
    .min(3, errors.min(3, "Nama"))
    .max(25, errors.max(25, "Nama"))
    .required(errors.req("Nama")),
  email: string().email(errors.email).required(errors.req("Email")),
  semester: number()
    .min(1, errors.semester("minimal", 1))
    .max(14, errors.semester("maksimal", 14))
    .required(errors.req("Semester")),
  study: string().oneOf(STUDY_NAME),
  bio: string()
    .min(10, errors.min(10, "Bio"))
    .max(200, errors.max(200, "Bio"))
    .required(errors.req("Bio")),
  nim: string()
    .min(4, errors.min(4, "NIM"))
    .max(12, errors.max(12, "NIM"))
    .required(errors.req("NIM")),
});
