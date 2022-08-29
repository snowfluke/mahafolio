import { Link } from "@solidjs/router";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignout } from "../hooks/useSignout";
import { NAV_MENU } from "../utils/constant";

function Nav() {
  const [user] = useAuthContext();
  const { logout } = useSignout();

  return (
    <ul className="inline-flex gap-4">
      <For each={NAV_MENU}>
        {(item) => (
          <li>
            <Link
              href={item.route}
              class="underline text-green underline-offset-4"
            >
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
              class="underline text-green underline-offset-4"
            >
              Bergabung
            </Link>
          </li>
        }
      >
        <li>
          <Link
            href={"/mahasiswa"}
            class="underline text-green underline-offset-4"
          >
            Profil
          </Link>
        </li>
        <li>
          <Link href={"/folio"} class="underline text-green underline-offset-4">
            Folio
          </Link>
        </li>
        <li>
          <div
            onClick={logout}
            class="cursor-pointer underline text-red-500 underline-offset-4"
          >
            [Keluar]
          </div>
        </li>
      </Show>
    </ul>
  );
}
export default Nav;
