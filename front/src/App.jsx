import Router from "./routes";
import Header from "./components/header";
import Footer from "./components/footer";
import Container from "./components/container";

function App() {
  return (
    <Container>
      <Header />

      <Router />

      <Footer />
    </Container>
  );
}

export default App;
