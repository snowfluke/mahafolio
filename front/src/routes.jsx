import { lazy } from "solid-js";
import { Routes, Route, Navigate } from "@solidjs/router";
import { useAuthContext } from "./hooks/useAuthContext";
import ErrorDisplay from "./components/error";
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Profiles = lazy(() => import("./pages/Profiles"));
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
      <Route path="/mahasiswa/:id" component={Profile} />
      <Route
        path="/mahasiswa"
        component={() => (
          <>{user().mhs ? <Profiles /> : <Navigate href="/" />}</>
        )}
      />
      <Route
        path="/*"
        component={<ErrorDisplay err={"404 - Halaman tidak ditemukan"} />}
      />
    </Routes>
  );
}
export default Router;
