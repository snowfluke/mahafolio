import { Link } from "@solidjs/router";

function PaperGrid({ children, link }) {
  return (
    <Link href={link} className="table-row border-b border-slate-700/50">
      {children}
    </Link>
  );
}
export default PaperGrid;
