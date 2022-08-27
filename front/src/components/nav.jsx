import { Link } from "@solidjs/router";
import { useAuthContext } from "../hooks/useAuthContext";
import { NAV_MENU } from "../utils/constant";

function Nav() {
  const [user] = useAuthContext();

  return (
    <ul className="inline-flex gap-4">
      <For each={NAV_MENU}>
        {(item) => (
          <li>
            <Link href={item.route} class="underline text-green underline-offset-4">
              {item.name}
            </Link>
          </li>
        )}
      </For>

      <Show
        when={user().mhs}
        fallback={
          <li>
            <Link
              href={"/coretan"}
              class="underline text-green underline-offset-2"
            >
              Bergabung
            </Link>
          </li>
        }
      >
        <li>
          <Link
            href={"/mahasiswa"}
            class="underline text-green underline-offset-2"
          >
            Profil
          </Link>
        </li>
      </Show>
    </ul>
  );
}
export default Nav;
