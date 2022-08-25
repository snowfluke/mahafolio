function ActionButton(props) {
  return (
    <span
      className={
        "my-1 hover:underline cursor-pointer inline select-none " + props.extend
      }
      onClick={props.action}
    >
      {props.title}
    </span>
  );
}
export default ActionButton;
