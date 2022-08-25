import { Link } from "@solidjs/router";

function Welcome({ to }) {
  return (
    <span className="responsive-text">
      Selamat datang kembali,{" "}
      <Link
        href="/mahasiswa"
        className="underline text-green underline-offset-2"
      >
        {to}
      </Link>
    </span>
  );
}
export default Welcome;
