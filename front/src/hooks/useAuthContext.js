import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "solid-js";

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("Konteks Autentikasi berada diluar Provider!");
  }

  return context;
};
