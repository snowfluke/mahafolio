import { createSignal } from "solid-js";
import fetcher from "../utils/fetcher";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "solid-js";
import { useAuthContext } from "./useAuthContext";

export const useProfileData = () => {
  const context = useContext(UserContext);
  const [isLoading, setIsLoading] = createSignal(false);
  const [contextError, setContextError] = createSignal(false);
  const [user] = useAuthContext();
  const [profileData, { updateProfileData }] = context;

  const setProfile = async (id) => {
    setIsLoading(true);
    setContextError(false);

    const response = await fetcher(encodeURI(`/api/mahasiswa/${id}`), {
      method: "GET",
    });

    if (response.error) {
      setIsLoading(false);
      setContextError(response.error);
      return;
    }

    setIsLoading(false);
    updateProfileData(response);
  };

  const updateProfile = async (data) => {
    if (!user().mhs) return setContextError("503 - Halaman tidak diizinkan");

    const response = await fetcher(
      encodeURI(`/api/mahasiswa/${user().mhs._id}`),
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user().mhs.token,
        },
      }
    );

    if (response.error) {
      return response;
    }

    updateProfileData(response);
    return response;
  };
  return {
    profileData,
    setProfile,
    updateProfile,
    isLoading,
    contextError,
  };
};