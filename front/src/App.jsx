import Router from "./routes";
import Header from "./components/header";
import Footer from "./components/footer";
import Container from "./components/container";
import Nav from "./components/nav";
import Loading from "./components/loading";
import ErrorDisplay from "./components/error";
import { ErrorBoundary, Suspense } from "solid-js";

function App() {
  return (
    <Container>
      <Header />
      <Nav />
      <ErrorBoundary
        fallback={(err, reset) => <ErrorDisplay err={err} reset={reset} />}
      >
        <Suspense fallback={<Loading />}>
          <Router />
        </Suspense>
      </ErrorBoundary>
      <Footer />
    </Container>
  );
}

export default App;
