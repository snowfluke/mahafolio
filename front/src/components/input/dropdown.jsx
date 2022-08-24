import { createSignal } from "solid-js";

function Dropdown(props) {
  const [showDropdown, setShowDropdown] = createSignal(false);
  const [selected, setSelected] = createSignal(props.items[0].name);

  return (
    <div class="dropdown relative">
      <button
        class="dropdown-toggle flex items-center whitespace-nowrap bg-green px-4 md:px-6 py-2.5 leading-tight text-white focus:outline-none focus:ring-0"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        onClick={() => setShowDropdown(!showDropdown())}
      >
        {selected()}
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="caret-down"
          class="ml-4 w-2"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 320 512"
        >
          <path
            fill="currentColor"
            d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"
          ></path>
        </svg>
      </button>
      <Show when={showDropdown()}>
        <ul class="absolute z-50 float-left m-0 mt-1 w-full list-none rounded-lg bg-white bg-clip-padding text-left border-slate-200 border-[1px]">
          <For
            each={props.items}
            fallback={<div>Tidak terdapat klasemen saat ini</div>}
          >
            {(item) => (
              <li
                className="block cursor-pointer w-full whitespace-nowrap bg-transparent py-2 px-4 text-xs md:text-sm font-normal text-black-700 hover:bg-slate-200"
                onClick={() => {
                  setSelected(item.name);
                  props.signal(item.key, item.value);
                  setShowDropdown(!showDropdown());
                }}
              >
                {item.name}
              </li>
            )}
          </For>
        </ul>
      </Show>
    </div>
  );
}
export default Dropdown;
