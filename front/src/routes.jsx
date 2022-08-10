import { lazy } from "solid-js";
import { Routes, Route } from "@solidjs/router";
const Landing = lazy(() => import("./pages/Landing"));
const Home = lazy(() => import("./pages/Home"));

function Router() {
  return (
    <Routes>
      <Route path="/" component={Landing} />
      <Route path="/home" component={Home} />
    </Routes>
  );
}
export default Router;
