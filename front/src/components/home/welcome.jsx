import { Link } from "@solidjs/router";

function Welcome({ to }) {
  return (
    <span className="responsive-text-xs">
      Selamat datang kembali,{" "}
      <Link href="/mahasiswa" className="text-list text-green">
        {to}
      </Link>
    </span>
  );
}
export default Welcome;
