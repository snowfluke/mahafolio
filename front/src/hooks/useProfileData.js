import { createSignal, useContext } from "solid-js";
import { UserContext } from "../contexts/UserContext";
import { useAuthContext } from "./useAuthContext";

import { BACKEND_URL } from "../utils/constant";
import { refresher } from "../utils/string";
import fetcher from "../utils/fetcher";

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
    updateProfileData({
      ...response,
      fetchUri: `${BACKEND_URL}/api/photo/${response._id}`,
    });
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

    let newProfileData = {
      ...profileData().mhs,
      ...response,
    };

    if (data.photo) {
      newProfileData.fetchUri = `${BACKEND_URL}/api/photo/${
        response._id
      }?refresh=${refresher()}`;
    }

    updateProfileData(newProfileData);
    return response;
  };

  const resetProfile = () => updateProfileData(null);
  return {
    profileData,
    setProfile,
    updateProfile,
    isLoading,
    contextError,
    resetProfile,
  };
};
