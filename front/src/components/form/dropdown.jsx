function Dropdown({ items, ref, selected = "", onChange = () => false }) {
  return (
    <div class="dropdown relative">
      <select ref={ref} onChange={onChange}>
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
