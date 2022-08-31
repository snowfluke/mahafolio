import { useNavigate } from "@solidjs/router";
import { useAuthContext } from "./useAuthContext";
import { useProfileData } from "./useProfileData";

export const useSignout = () => {
  const navigate = useNavigate();

  const [_, { setAuthContextLoggedOut }] = useAuthContext();
  const { resetProfile } = useProfileData();

  const logout = () => {
    localStorage.removeItem("mhs");
    resetProfile();
    setAuthContextLoggedOut();
    navigate("/coretan", { replace: true });
  };
  return { logout };
};
