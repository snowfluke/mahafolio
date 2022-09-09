import { NavLink } from "@solidjs/router";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignout } from "../hooks/useSignout";

function Nav() {
  const [user] = useAuthContext();
  const { logout } = useSignout();

  return (
    <ul className="nav-ul">
      <Show
        when={user().mhs}
        fallback={
          <li>
            <NavLink
              href={"/"}
              inactiveClass="text-list text-green"
              activeClass="font-bold"
              end={true}
            >
              Beranda
            </NavLink>
          </li>
        }
      >
        <Show when={!user().mhs.admin}>
          <li>
            <NavLink
              href={"/"}
              inactiveClass="text-list text-green"
              activeClass="font-bold"
              end={true}
            >
              Beranda
            </NavLink>
          </li>
        </Show>
      </Show>

      <li>
        <NavLink
          href={"/klasemen"}
          inactiveClass="text-list text-green"
          activeClass="font-bold"
        >
          Klasemen
        </NavLink>
      </li>

      <Show when={!user().mhs}>
        <li>
          <NavLink
            href={"/coretan"}
            inactiveClass="text-list text-green"
            activeClass="font-bold"
          >
            Bergabung
          </NavLink>
        </li>
      </Show>
      <Show when={user().mhs && !user().mhs.admin}>
        <li>
          <NavLink
            href={"/mahasiswa"}
            inactiveClass="text-list text-green"
            activeClass="font-bold"
            end={true}
          >
            Profil
          </NavLink>
        </li>
        <li>
          <NavLink
            href={"/folio"}
            inactiveClass="text-list text-green"
            activeClass="font-bold"
            end={true}
          >
            Folio
          </NavLink>
        </li>
        <li>
          <div onClick={logout} class="text-list text-red-500">
            Keluar
          </div>
        </li>
      </Show>

      <Show when={user().mhs && user().mhs.admin}>
        <li>
          <NavLink
            href={"/admin/dashboard"}
            inactiveClass="text-list text-green"
            activeClass="font-bold"
            end={true}
          >
            Dasbor
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
