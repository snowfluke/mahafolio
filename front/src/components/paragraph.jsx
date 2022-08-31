function Paragraph(props) {
  return (
    <div>
      <For each={props.children.split(";;")}>
        {(item) => (
          <>
            <p className="">{item.trim()}</p>
            <br />
          </>
        )}
      </For>
    </div>
  );
}
export default Paragraph;
