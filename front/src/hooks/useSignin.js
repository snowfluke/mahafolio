import { createSignal } from "solid-js";
import { useAuthContext } from "./useAuthContext";
import { loginSchema } from "../validations";
import fetcher from "../utils/fetcher";

export const useSignin = () => {
  const [error, setError] = createSignal(false);
  const [isLoading, setIsLoading] = createSignal(false);
  const [_, { setAuthContextLoggedIn }] = useAuthContext();

  const signin = async (email, password) => {
    setIsLoading(true);
    setError(false);

    try {
      await loginSchema.validate({ email, password });
      const response = await fetcher("/api/mahasiswa/signin", {
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

  return { signin, isLoading, error };
};
