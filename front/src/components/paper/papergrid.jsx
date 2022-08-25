import { Link } from "@solidjs/router";

function PaperGrid({ data, index, color = false, search = false }) {
  return (
    <Link
      href={`/mahasiswa/${data._id}`}
      className="table-row border-b border-slate-700/50"
    >
      <td className="md:w-[10%] lg:w-[5%] w-[15%] border-r border-slate-700/50 p-1">
        <div
          className={
            "border border-slate-700/50 flex items-center " +
            getBgColor(color ? index() : 4)
          }
        >
          <span className="mx-auto px-2 text-center truncate">
            {index() + 1}
          </span>
        </div>
      </td>
      <td className="pl-3 md:w-[80%] lg:w-[85%] w-[65%]">
        {search ? `${data.nim} _ ${data.name}` : data.name}
        <Show when={!search}>
          {index() == 0 && <span className="ml-2">👑</span>}
        </Show>
      </td>

      <Show when={!search}>
        <td className="text-right lg:w-[10%] w-[20%]">
          <span>{data.score || "0"}</span>pts
        </td>
      </Show>
    </Link>
  );
}
export default PaperGrid;

function getBgColor(index) {
  switch (index) {
    case 0:
      return "bg-emas text-white border-none";
    case 1:
      return "bg-perak text-white border-none";
    case 2:
      return "bg-perunggu text-white border-none";
    default:
      return "border-[1px]";
  }
}
