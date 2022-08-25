function ButtonAccent({ title, wrapperStyle, action }) {
  return (
    <div className={wrapperStyle}>
      <button
        onClick={action}
        className="responsive-text r-4 border-l-2 border-r-2 bg-white tracking-widest font-semibold text-green py-2 px-10"
      >
        {title}
      </button>
    </div>
  );
}
export default ButtonAccent;
