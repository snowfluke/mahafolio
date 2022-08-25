function ButtonClassic({ title, action }) {
  return (
    <button
      onClick={action}
      className="bg-green responsive-text text-white font-semibold px-10 py-2 tracking-widest border-y-2 border-green hover:text-green hover:bg-white"
    >
      {title}
    </button>
  );
}
export default ButtonClassic;
