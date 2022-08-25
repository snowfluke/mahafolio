import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Profile = lazy(() => import("./pages/Profile"));

function Router() {
  return (
    <Routes>
      <Route path="/" component={Home} />
      <Route path="/coretan" component={Login} />
      <Route path="/klasemen" component={Leaderboard} />
      <Route path="/mahasiswa/*" component={Profile} />
    </Routes>
  );
}
export default Router;
