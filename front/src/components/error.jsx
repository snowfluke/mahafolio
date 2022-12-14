import { Link } from "@solidjs/router";

function ErrorDisplay({ err = "Kesalahan internal", reset }) {
  return (
    <div className="flex flex-col justify-start items-center font-semibold text-red-400">
      <div className="text-xl">⚠️ Terjadi Kesalahan: ⚠️</div>
      <div className="text-md">{err.toString()}</div>
      <div className="flex space-x-4">
        <Link href="/" className="cursor-pointer text-md py-2 px-4 mt-5 bg-white shadow border-red-400 border-y-2 hover:border-x-2 hover:border-y-0">
          Beranda
        </Link>
        <div onClick={reset} className="cursor-pointer text-md py-2 px-4 mt-5 bg-white shadow border-red-400 border-y-2 hover:border-x-2 hover:border-y-0">
          Coba lagi
        </div>
      </div>
    </div>
  );
}
export default ErrorDisplay;
