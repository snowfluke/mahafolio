import { lazy } from "solid-js";
import { Routes, Route, Navigate } from "@solidjs/router";
import { useAuthContext } from "./hooks/useAuthContext";
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));

function Router() {
  const [user] = useAuthContext();

  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route
        path="/coretan"
        component={() => <>{user().mhs ? <Navigate href="/" /> : <Login />}</>}
      />
      <Route path="/klasemen" component={Leaderboard} />
      <Route path="/mahasiswa/" component={Profile} />
    </Routes>
  );
}
export default Router;
