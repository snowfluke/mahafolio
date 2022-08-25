import { Link } from "@solidjs/router";

function Welcome() {
  return (
    <span className="responsive-text">
      Selamat datang kembali,{" "}
      <Link
        href="/mahasiswa/"
        className="underline text-green underline-offset-2"
      >
        wilisetiawan087@gmail.com
      </Link>
    </span>
  );
}
export default Welcome;
