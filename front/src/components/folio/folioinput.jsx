function FolioInput(props) {
  return (
    <input
      className="flex-1 ml-2 underline-offset-2 underline"
      spellCheck={false}
      ref={props.ref}
      type={"text"}
      value={props.value || ""}
    />
  );
}
export default FolioInput;
