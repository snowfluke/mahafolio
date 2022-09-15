function ButtonAccent({ title, wrapperStyle, action, variant = false }) {
  return (
    <div className={wrapperStyle}>
      <button
        onClick={action}
        className={"responsive-text border-x-2 hover:border-x-0 hover:border-y-2 bg-white tracking-widest font-semibold py-2 px-10 " + (variant ? "text-red-500 border-red-500" : "text-green")}
      >
        {title}
      </button>
    </div>
  );
}
export default ButtonAccent;
