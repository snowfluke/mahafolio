function FolioInput(props) {
  return (
    <input
      className="flex-1 ml-2 underline-offset-2 underline"
      spellCheck={false}
      name={props.name}
      type={"text"}
      value={props.value || ""}
    />
  );
}
export default FolioInput;
