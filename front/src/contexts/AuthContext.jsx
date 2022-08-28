import { createContext, createSignal, onMount } from "solid-js";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [state, setState] = createSignal(props.mhs);

  const mhs = [
    state,
    {
      setAuthContextLoggedIn: (mhs) => setState({ mhs }),
      setAuthContextLoggedOut: () => setState({ mhs: null }),
    },
  ];

  onMount(() => {
    const user = JSON.parse(localStorage.getItem("mhs"));

    if (user) setState({ mhs: user });
  });

  return (
    <AuthContext.Provider value={mhs}>{props.children}</AuthContext.Provider>
  );
};
