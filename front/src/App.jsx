import Router from "./routes";
import Header from "./components/header";
import Footer from "./components/footer";
import Container from "./components/container";
import Nav from "./components/nav";
import Loading from "./components/loading";
import { Suspense } from "solid-js";

function App() {
  return (
    <Container>
      <Header />
      <Nav />
      <Suspense fallback={<Loading />}>
        <Router />
      </Suspense>
      <Footer />
    </Container>
  );
}

export default App;
