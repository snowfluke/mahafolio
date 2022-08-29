/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";

import "./index.css";
import App from "./App";

import { AuthContextProvider } from "./contexts/AuthContext";
import { UserContextProvider } from "./contexts/UserContext";

render(
  () => (
    <AuthContextProvider mhs={{ mhs: null }}>
      <UserContextProvider mhs={{ mhs: null }}>
        <Router>
          <App />
        </Router>
      </UserContextProvider>
    </AuthContextProvider>
  ),
  document.getElementById("root")
);
