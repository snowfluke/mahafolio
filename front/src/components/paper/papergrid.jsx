import { useNavigate } from "@solidjs/router";

function PaperGrid({ children, link }) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(link)} className="cursor-pointer table-row border-b border-slate-700/50 hover:bg-slate-100">
      {children}
    </div>
  );
}
export default PaperGrid;
