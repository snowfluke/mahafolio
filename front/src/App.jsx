import { ErrorBoundary, Show } from "solid-js";
import Router from "./routes";

import Header from "./components/header";
import Footer from "./components/footer";
import Container from "./components/container";
import Nav from "./components/nav";
import ErrorDisplay from "./components/error";
import { useNotif } from "./hooks/useNotif";
import Notif from "./components/notif";

function App() {
  const { notif } = useNotif();
  return (
    <Container>
      <Header />
      <Nav />
      <ErrorBoundary
        fallback={(err, reset) => {
          return <ErrorDisplay err={err} reset={reset} />;
        }}
      >
        <Router />
      </ErrorBoundary>
      <Footer />
      <Show when={notif().show}>
        <Notif content={notif().content} type={notif().type} />
      </Show>
    </Container>
  );
}

export default App;
