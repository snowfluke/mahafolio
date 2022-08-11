import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";
const Landing = lazy(() => import("./pages/Landing"));
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));

function Router() {
  return (
    <Routes>
      <Route path="/" component={Landing} />
      <Route path="/home" component={Home} />
      <Route path="/login" component={Login} />
    </Routes>
  );
}
export default Router;
