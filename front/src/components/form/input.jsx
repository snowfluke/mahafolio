function Input(props) {
  return (
    <input
      {...props}
      spellCheck={false}
      className="border-green/70 border-2 px-4 py-2 w-full outline-none mb-2"
    />
  );
}
export default Input;
