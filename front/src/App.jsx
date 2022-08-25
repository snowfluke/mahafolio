import Router from "./routes";
import Header from "./components/header";
import Footer from "./components/footer";
import Container from "./components/container";
import Nav from "./components/nav";
import ErrorDisplay from "./components/error";
import { ErrorBoundary } from "solid-js";

function App() {
  return (
    <Container>
      <Header />
      <Nav />
      <ErrorBoundary
        fallback={(err, reset) => {
          console.log(err);
          return <ErrorDisplay err={err} reset={reset} />;
        }}
      >
        <Router />
      </ErrorBoundary>
      <Footer />
    </Container>
  );
}

export default App;
