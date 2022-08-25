function Input(props) {
  return (
    <input
      required={true}
      {...props}
      spellCheck={false}
      className="border-green/70 border px-4 py-2 w-full rounded-md outline-none mb-2"
    />
  );
}
export default Input;
