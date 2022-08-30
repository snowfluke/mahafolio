import { Link } from "@solidjs/router";

function PaperLeft({ content, color = false, href = false }) {
  return (
    <td className="md:w-[20%] lg:w-[15%] w-[15%] border-r border-slate-700/50 p-1">
      <Show
        when={!href}
        fallback={
          <Link
            href={href}
            className="border border-slate-700/50 flex items-center hover:bg-slate-100"
          >
            <span className="mx-auto px-2 text-center truncate">{content}</span>
          </Link>
        }
      >
        <div
          className={
            "border border-slate-700/50 flex items-center " +
            getBgColor(color ? color : 4)
          }
        >
          <span className="mx-auto px-2 text-center truncate">{content}</span>
        </div>
      </Show>
    </td>
  );
}
export default PaperLeft;

function getBgColor(index) {
  switch (index) {
    case 1:
      return "bg-emas text-white border-none";
    case 2:
      return "bg-perak text-white border-none";
    case 3:
      return "bg-perunggu text-white border-none";
    default:
      return "border-[1px]";
  }
}
