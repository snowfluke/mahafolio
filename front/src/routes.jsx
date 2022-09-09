import { lazy } from "solid-js";
import { Routes, Route, Navigate } from "@solidjs/router";
import { useAuthContext } from "./hooks/useAuthContext";
import ErrorDisplay from "./components/error";

const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Admin = lazy(() => import("./pages/Admin"));
const Profiles = lazy(() => import("./pages/Profiles"));
const Profile = lazy(() => import("./pages/Profile"));
const Folio = lazy(() => import("./pages/Folio"));
const Folios = lazy(() => import("./pages/Folios"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Reset = lazy(() => import("./pages/Reset"));
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
  const loginAdminCheck = () => (
    <>
      {user().mhs && user().mhs.admin ? (
        <Navigate href="/admin/dashboard" />
      ) : user().mhs && !user().mhs.admin ? (
        <Navigate href="/" />
      ) : (
        <Admin />
      )}
    </>
  );
  const dashboardLoginCheck = () => (
    <>
      {user().mhs && user().mhs.admin ? (
        <Dashboard />
      ) : (
        <Navigate href="/admin" />
      )}
    </>
  );

  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/coretan" component={loginCheck} />
      <Route path="/klasemen" component={Leaderboard} />
      <Route path="/mahasiswa" component={mahasiswaLoginCheck} />
      <Route path="/admin" component={loginAdminCheck} />
      <Route path="/mahasiswa/:id" component={Profile} />
      <Route path="/folio" component={folioLoginCheck} />
      <Route path="/folio/:id" component={Folio} />
      <Route path="/tentang" component={About} />
      <Route path="/kontak" component={Contact} />
      <Route path="/kebijakan" component={Policies} />
      <Route path="/lupa-sandi" component={Reset} />
      <Route path="/admin/dashboard" component={dashboardLoginCheck} />
      <Route
        path="/*"
        component={<ErrorDisplay err={"404 - Halaman tidak ditemukan"} />}
      />
    </Routes>
  );
}
export default Router;
