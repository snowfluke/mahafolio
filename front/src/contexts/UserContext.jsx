import { createContext, createSignal } from "solid-js";

export const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [profileData, setProfileData] = createSignal({ ...props.mhs });
  const [notif, setNotif] = createSignal({
    show: false,
    type: false,
    content: "",
  });
  const [modal, setModal] = createSignal({
    title: "",
    description: "",
    actionName: "",
    show: false,
    ok: () => {},
    children: "",
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
        }, 3000);
      },
    },
    modal,
    {
      showModal: ({ title, children, ok, description, actionName }) =>
        setModal({
          title,
          description,
          actionName,
          show: true,
          ok,
          children,
        }),
      closeModal: () =>
        setModal({
          title: "",
          description: "",
          actionName: "",
          show: false,
          ok: () => {},
          children: "",
        }),
    },
  ];

  return (
    <UserContext.Provider value={mhs}>{props.children}</UserContext.Provider>
  );
};
