import { capitalize } from "../../utils/string";

function HeroBio({ study, semester, bio }) {
  return (
    <div className="flex justify-between items-center space-x-4">
      <div className="flex flex-col responsive-text">
        <span>{capitalize(study)}</span>
        <span>Semester {semester}</span>
      </div>
      <div className="text-right md:text-left">
        <span className="italic responsive-text truncate">{bio}</span>
      </div>
    </div>
  );
}
export default HeroBio;
