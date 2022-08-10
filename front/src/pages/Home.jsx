import { Link } from "@solidjs/router";

function Home() {
  return (
    <div>
      <h1>Homepage</h1>
      <br />
      <Link href="/">Goto Landing page</Link>
    </div>
  );
}
export default Home;
