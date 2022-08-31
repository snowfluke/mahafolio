import { NavLink } from "@solidjs/router";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignout } from "../hooks/useSignout";
import { NAV_MENU } from "../utils/constant";

function Nav() {
  const [user] = useAuthContext();
  const { logout } = useSignout();

  return (
    <ul className="nav-ul">
      <For each={NAV_MENU}>
        {(item) => (
          <li>
            <NavLink href={item.route} inactiveClass="text-list text-green" activeClass="font-bold" end={true}>
              {item.name}
            </NavLink>
          </li>
        )}
      </For>

      <Show
        when={user().mhs}
        fallback={
          <li>
            <NavLink href={"/coretan"} inactiveClass="text-list text-green" activeClass="font-bold">
              Bergabung
            </NavLink>
          </li>
        }
      >
        <li>
          <NavLink href={"/mahasiswa"} inactiveClass="text-list text-green" activeClass="font-bold" end={true}>
            Profil
          </NavLink>
        </li>
        <li>
          <NavLink href={"/folio"} inactiveClass="text-list text-green" activeClass="font-bold" end={true}>
            Folio
          </NavLink>
        </li>
        <li>
          <div onClick={logout} class="text-list text-red-500">
            Keluar
          </div>
        </li>
      </Show>
    </ul>
  );
}
export default Nav;
