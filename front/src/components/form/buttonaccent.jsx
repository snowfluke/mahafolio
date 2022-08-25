function ButtonAccent({ title, wrapperStyle, action }) {
  return (
    <div className={wrapperStyle}>
      <button
        onClick={action}
        className="responsive-text border-x-2 hover:border-x-0 hover:border-y-2 bg-white tracking-widest font-semibold text-green py-2 px-10"
      >
        {title}
      </button>
    </div>
  );
}
export default ButtonAccent;
