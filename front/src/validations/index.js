import { object, string, number, ref } from "yup";

const errors = {
  email: {
    val: "Masukkkan email yang valid!",
    req: "Silakan masukkan emailmu",
  },
  password: {
    req: "Silakan masukkan kata sandimu",
    confirm: "Kata sandi yang dimasukan tidak sesuai!",
    matches:
      "Kata sandi harus terdiri setidaknya 8 karakter, huruf kapital, huruf kecil, angka dan karakter spesial!",
  },
  keyword: {
    min: "Panjang pencarian minimal 3 huruf",
    max: "Panjang pencarian maksimal 15 huruf",
    req: "Silakan mengisi kata kunci pencarian",
  },
  folioSearch: {
    min: "Panjang pencarian minimal 3 huruf",
    max: "Panjang pencarian maksimal 25 huruf",
    req: "Silakan mengisi kata kunci pencarian",
  },
};

export const loginSchema = object({
  email: string().email(errors.email).required(errors.email.req),
  password: string()
    .required(errors.password.req)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      errors.password.matches
    ),
});

export const searchSchema = object({
  keyword: string()
    .min(3, errors.keyword.min)
    .max(15, errors.keyword.max)
    .required(errors.keyword.req),
});

export const folioSearchSchema = object({
  q: string()
    .min(3, errors.folioSearch.min)
    .max(25, errors.folioSearch.max)
    .required(errors.folioSearch.req),
});
