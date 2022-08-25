function BigInput(props) {
  return (
    <input
      type="text"
      spellcheck={false}
      className="px-4 md:px-8 py-4 focus:outline-green w-full responsive-text truncate"
      placeholder={props.placeholder}
      {...props}
    />
  );
}
export default BigInput;
