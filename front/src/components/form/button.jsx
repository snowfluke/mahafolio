function Button(props) {
  let disabled = props.disabled === true || false;
  return (
    <button
      disabled={disabled}
      className={
        "font-semibold w-full text-center bg-green border-y-2 my-5 border-green text-white tracking-widest py-2 hover:bg-white hover:text-green"
      }
    >
      {props.title}
    </button>
  );
}
export default Button;
