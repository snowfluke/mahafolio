function ErrorDisplay({ err, reset }) {
  return (
    <div
      onClick={reset}
      className="flex flex-col justify-center items-center h-screen font-semibold text-red-400"
    >
      <div className="text-xl flex-1">Terjadi Kesalahan:</div>
      <div className="flex-1 text-md">{err.toString()}</div>
    </div>
  );
}
export default ErrorDisplay;
