import { object, string, number, setLocale } from "yup";

const errors = {
  email: "Masukkkan email yang valid!",
  password: {
    min: "Panjang minimal kata sandi 8 karakter!",
    req: "Kata sandi tidak boleh kosong!",
  },
};

export const loginSchema = object({
  email: string().email(errors.email).required(),
  password: string().min(8, errors.password.min).required(errors.password.req),
});

export const registerSchema = object({
  email: string().email(errors.email).required(),
  password: string().min(8, errors.password.min).required(errors.password.req),
  confirm: string().min(8).required(),
});
