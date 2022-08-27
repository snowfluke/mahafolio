function Dropdown({
  items,
  ref,
  name = "",
  selected = "",
  onChange = () => false,
}) {
  return (
    <div class="dropdown relative">
      <select ref={ref} onChange={onChange} name={name}>
        <For each={items}>
          {(item) => (
            <option selected={item.value == selected} value={item.value}>
              {item.name}
            </option>
          )}
        </For>
      </select>
    </div>
  );
}
export default Dropdown;
