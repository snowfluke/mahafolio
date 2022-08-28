import { createContext, createEffect, createSignal } from "solid-js";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [profileData, setProfileData] = createSignal({ ...props.mhs });

  const mhs = [
    profileData,
    {
      updateProfileData: (data) => setProfileData({ mhs: data }),
    },
  ];

  return (
    <UserContext.Provider value={mhs}>{props.children}</UserContext.Provider>
  );
};
