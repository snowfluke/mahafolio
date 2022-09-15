function ButtonClassic({ title, action, alter = false }) {
  return (
    <button
      onClick={action}
      className={
        "responsive-text font-semibold px-10 py-2 tracking-widest border-y-2" +
        (alter ? "bg-white text-red-500 hover:bg-red-100 border-red-500" : "border-green bg-green text-white hover:text-green hover:bg-white")
      }
    >
      {title}
    </button>
  );
}
export default ButtonClassic;
