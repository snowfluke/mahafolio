function ErrorDisplay({ err, reset }) {
  return (
    <div
      onClick={reset}
      className="flex flex-col justify-start items-center font-semibold text-red-400 cursor-pointer hover:text-green"
    >
      <div className="text-xl">Terjadi Kesalahan:</div>
      <div className="text-md">{err.toString()}</div>
    </div>
  );
}
export default ErrorDisplay;
