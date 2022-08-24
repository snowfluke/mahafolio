import Router from "./routes";
import Header from "./components/header";
import Footer from "./components/footer";
import Container from "./components/container";
import Nav from "./components/nav";

function App() {
  return (
    <Container>
      <Header />
      <Nav />
      <Router />

      <Footer />
    </Container>
  );
}

export default App;
