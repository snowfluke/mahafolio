import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));

function Router() {
  return (
    <Routes>
      {/* <Route path="/" component={Landing} /> */}
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/leaderboard" component={Leaderboard} />
    </Routes>
  );
}
export default Router;
