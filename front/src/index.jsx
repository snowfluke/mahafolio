/* @refresh reload */
import { render } from "solid-js/web";
import { Router } from "@solidjs/router";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./contexts/AuthContext";
render(
  () => (
    <AuthContextProvider mhs={{ mhs: null }}>
      <Router>
        <App />
      </Router>
    </AuthContextProvider>
  ),
  document.getElementById("root")
);
