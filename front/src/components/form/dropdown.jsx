function Dropdown({
  items,
  ref,
  name = "",
  selected = "",
  onChange = () => false,
  firstValue = "",
}) {
  return (
    <div class="dropdown relative">
      <select
        className="responsive-text-xs px-4 py-2 shadow block"
        ref={ref}
        onChange={onChange}
        name={name}
      >
        <For each={items}>
          {(item, index) => (
            <option selected={item.value == selected} value={item.value}>
              {firstValue ? (index() == 0 ? firstValue : item.name) : item.name}
            </option>
          )}
        </For>
      </select>
    </div>
  );
}
export default Dropdown;
