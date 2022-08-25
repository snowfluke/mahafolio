import { createSignal } from "solid-js";
import { useAuthContext } from "./useAuthContext";
import { loginSchema } from "../validations";
import fetcher from "../utils/fetcher";

export const useSignup = () => {
  const [error, setError] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  const [_, { setAuthContextLoggedIn }] = useAuthContext();

  const signup = async (email, password, confirm) => {
    setIsLoading(true);
    setError(false);

    try {
      await loginSchema.validate({ email, password });
      if (password !== confirm) {
        setIsLoading(false);
        setError("Kata sandi yang dimasukkan tidak sesuai!");
        return;
      }

      const response = await fetcher("/api/mahasiswa/signup", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.error) {
        setIsLoading(false);
        setError(response.error);
        return;
      }

      localStorage.setItem("mhs", JSON.stringify(response));
      setAuthContextLoggedIn(response);
      setIsLoading(false);
    } catch (error) {
      if (error.name == "ValidationError") {
        return setError(error.errors[0]);
      }
      setError(error.error);
    }
  };

  return { signup, isLoading, error };
};
