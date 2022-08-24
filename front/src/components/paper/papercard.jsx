function PaperCard({ children, title }) {
  return (
    <div>
      <div className="relative bg-white px-6 pt-14 pb-8 md:p-8 shadow-[0_10px_5px_-3px_rgb(0,0,0,0.1)]">
        <div className="absolute top-0 right-0 h-0 w-0 rotate-180 border-b-[50px] border-r-[50px] border-l-[0px] border-b-gray border-r-transparent border-l-transparent"></div>
        <div className="absolute top-0 right-0 h-0 w-0 border-b-[50px] border-r-[50px] border-t-[0px] border-b-slate-200 border-r-transparent border-l-transparent"></div>

        <div>
          <span className="responsive-text">{title}</span>
          {children}
          <div className="flex justify-end mt-6 responsive-text select-none">
            <span className="text-slate-700/70">Sinar Galaksi</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default PaperCard;
