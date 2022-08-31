function FolioInput(props) {
  return (
    <input
      className="flex-1 ml-2 px-2 bg-slate-100"
      spellCheck={false}
      name={props.name}
      type={"text"}
      value={props.value || ""}
      placeholder={props.placeholder}
    />
  );
}
export default FolioInput;
