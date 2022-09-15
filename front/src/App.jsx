import { ErrorBoundary, Show } from "solid-js";
import Router from "./routes";

import Header from "./components/header";
import Footer from "./components/footer";
import Container from "./components/container";
import Nav from "./components/nav";
import ErrorDisplay from "./components/error";
import { useNotif } from "./hooks/useNotif";
import Notif from "./components/notif";
import ModalCard from "./components/modal/modalcard";
import { useModal } from "./hooks/useModal";

function App() {
  const { notif } = useNotif();
  const { modal, closeModal } = useModal();
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
      <Show when={notif().show}>
        <Notif content={notif().content} type={notif().type} />
      </Show>
      <Show when={modal().show}>
        <ModalCard
          title={modal().title}
          ok={modal().ok}
          close={closeModal}
          description={modal().description}
          actionName={modal().actionName}
        >
          {modal().children}
        </ModalCard>
      </Show>
      <Footer />
    </Container>
  );
}

export default App;
