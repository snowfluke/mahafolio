function ActionButton(props) {
  return (
    <button className="w-full text-right" onClick={props.action} {...props}>
      {props.title}
    </button>
  );
}
export default ActionButton;
