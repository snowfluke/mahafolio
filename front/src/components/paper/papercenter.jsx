function PaperCenter(props) {
  return (
    <>
      <td
        className={
          "pl-3 truncate flex flex-1 hover:bg-slate-100 " +
          (props.bold ? "font-bold" : "")
        }
      >
        {props.content || props.children}
        <Show when={props.emoji && props.index == 0}>
          <span className="ml-2">👑</span>
        </Show>
      </td>
    </>
  );
}
export default PaperCenter;
