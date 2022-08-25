function Button(props) {
  return (
    <button className="font-semibold w-full text-center bg-green border-[1px] my-5 border-green text-white tracking-widest rounded-md py-2 hover:bg-white hover:text-green">
      {props.title}
    </button>
  );
}
export default Button;
