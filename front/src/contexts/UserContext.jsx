import { createContext, createSignal } from "solid-js";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [profileData, setProfileData] = createSignal({ ...props.mhs });
  const [notif, setNotif] = createSignal({
    show: false,
    type: false,
    content: "",
  });

  const mhs = [
    profileData,
    {
      updateProfileData: (data) => setProfileData({ mhs: data }),
    },
    notif,
    {
      showNotif: (type, content) => {
        setNotif({ show: true, type, content });

        setTimeout(() => {
          setNotif({ show: false, type: false, content: "" });
        }, 2000);
      },
    },
  ];

  return (
    <UserContext.Provider value={mhs}>{props.children}</UserContext.Provider>
  );
};
