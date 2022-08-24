import { Link } from "@solidjs/router";

function Nav() {
  return (
    <ul className="inline-flex gap-4">
      <li>
        <Link href="/" class="underline text-green underline-offset-2">
          Beranda
        </Link>
      </li>
      <li>
        <Link
          href="/leaderboard"
          class="underline text-green underline-offset-2"
        >
          Klasemen
        </Link>
      </li>
      <li>
        <Link href="/login" className="underline text-green underline-offset-2">
          Daftar
        </Link>
      </li>
    </ul>
  );
}
export default Nav;
