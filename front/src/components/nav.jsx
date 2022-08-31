import { NavLink } from "@solidjs/router";
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
            <NavLink
              href={item.route}
              inactiveClass="underline text-green underline-offset-4"
              activeClass="font-bold"
              end={true}
            >
              {item.name}
            </NavLink>
          </li>
        )}
      </For>

      <Show
        when={user().mhs}
        fallback={
          <li>
            <NavLink
              href={"/coretan"}
              inactiveClass="underline text-green underline-offset-4"
              activeClass="font-bold"
            >
              Bergabung
            </NavLink>
          </li>
        }
      >
        <li>
          <NavLink
            href={"/mahasiswa"}
            inactiveClass="underline text-green underline-offset-4"
            activeClass="font-bold"
            end={true}
          >
            Profil
          </NavLink>
        </li>
        <li>
          <NavLink
            href={"/folio"}
            inactiveClass="underline text-green underline-offset-4"
            activeClass="font-bold"
            end={true}
          >
            Folio
          </NavLink>
        </li>
        <li>
          <div
            onClick={logout}
            class="cursor-pointer underline text-red-500 underline-offset-4"
          >
            Keluar
          </div>
        </li>
      </Show>
    </ul>
  );
}
export default Nav;
