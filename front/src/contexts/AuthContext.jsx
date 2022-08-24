import { createContext, useContext, createSignal } from "solid-js";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [state, setState] = createSignal({ user: null });

  const mhs = [
    state,
    {
      login: (user) => setState({ user }),
      logout: () => setState({ user: null }),
    },
  ];

  console.log("AuthContext state: ", state());

  return <AuthContext.Provider value={mhs}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
