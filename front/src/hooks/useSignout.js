import { useAuthContext } from "./useAuthContext";
import { useProfileData } from "./useProfileData";

export const useSignout = () => {
  const [_, { setAuthContextLoggedOut }] = useAuthContext();
  const { resetProfile } = useProfileData();

  const logout = () => {
    localStorage.removeItem("mhs");
    resetProfile();
    setAuthContextLoggedOut();
  };
  return { logout };
};
