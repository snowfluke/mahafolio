import { createContext, createEffect, createSignal } from "solid-js";

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

  createEffect(() => {
    console.log("AuthContext state: ", state());
  });

  return (
    <AuthContext.Provider value={mhs}>{props.children}</AuthContext.Provider>
  );
};
