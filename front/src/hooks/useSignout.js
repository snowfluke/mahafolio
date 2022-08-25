import { useAuthContext } from "./useAuthContext";

export const useSignout = () => {
  const [_, { setAuthContextLoggedOut }] = useAuthContext();

  const logout = () => {
    localStorage.removeItem("mhs");
    setAuthContextLoggedOut();
  };
  return { logout };
};
