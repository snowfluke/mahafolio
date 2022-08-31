function Span(props) {
  return (
    <span className="responsive-text block">
      {props.text}
      <Show when={props.variable}>
        "<b>{props.variable}</b>":
      </Show>
    </span>
  );
}
export default Span;
