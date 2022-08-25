function Span({ text, variable = false }) {
  return (
    <span className="responsive-text block">
      {text}
      <Show when={variable}>
        "<b>{variable}</b>":
      </Show>
    </span>
  );
}
export default Span;
