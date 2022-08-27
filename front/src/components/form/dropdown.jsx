function Dropdown({ items, ref, onChange = () => false }) {
  return (
    <div class="dropdown relative">
      <select ref={ref} onChange={onChange}>
        <For each={items}>
          {(item) => <option value={item.value}>{item.name}</option>}
        </For>
      </select>
    </div>
  );
}
export default Dropdown;
