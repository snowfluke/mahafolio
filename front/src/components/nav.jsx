import { Link } from "@solidjs/router";
import { NAV_MENU } from "../utils/constant";

function Nav() {
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
    </ul>
  );
}
export default Nav;
