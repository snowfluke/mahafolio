import { lazy } from "solid-js";
import { Routes, Route, Navigate } from "@solidjs/router";
import { useAuthContext } from "./hooks/useAuthContext";
import ErrorDisplay from "./components/error";

const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Profiles = lazy(() => import("./pages/Profiles"));
const Profile = lazy(() => import("./pages/Profile"));
const Folio = lazy(() => import("./pages/Folio"));
const Folios = lazy(() => import("./pages/Folios"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Policies = lazy(() => import("./pages/Policies"));

function Router() {
  const [user] = useAuthContext();

  const mahasiswaLoginCheck = () => (
    <>{user().mhs ? <Profiles /> : <Navigate href="/coretan" />}</>
  );
  const folioLoginCheck = () => (
    <>{user().mhs ? <Folios /> : <Navigate href="/coretan" />}</>
  );
  const loginCheck = () => (
    <>{user().mhs ? <Navigate href="/" /> : <Login />}</>
  );

  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/coretan" component={loginCheck} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/klasemen" component={Leaderboard} />
      <Route path="/mahasiswa" coContactmponent={mahasiswaLoginCheck} />
      <Route path="/mahasiswa/:id" component={Profile} />
      <Route path="/folio" component={folioLoginCheck} />
      <Route path="/folio/:id" component={Folio} />
      <Route path="/tentang" component={About} />
      <Route path="/kontak" component={Contact} />
      <Route path="/kebijakan" component={Policies} />
      <Route
        path="/*"
        component={<ErrorDisplay err={"404 - Halaman tidak ditemukan"} />}
      />
    </Routes>
  );
}
export default Router;
