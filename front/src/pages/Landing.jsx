import { Link } from "@solidjs/router";

function Landing() {
  return (
    <div>
      <h1>Landing page</h1>
      <br />
      <Link href="/home">Goto Home page</Link>
    </div>
  );
}
export default Landing;
