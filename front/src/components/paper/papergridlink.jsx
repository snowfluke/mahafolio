import { Link } from "@solidjs/router";

function PaperGridLink({ children, link }) {
  return (
    <Link
      href={link}
      target="_blank"
      className="cursor-pointer table-row border-b border-slate-700/50 hover:bg-slate-100"
    >
      {children}
    </Link>
  );
}
export default PaperGridLink;
