import { createResource, Suspense } from "solid-js";
import { createStore } from "solid-js/store";
import ButtonAccent from "../components/form/buttonaccent";
import Dropdown from "../components/form/dropdown";
import PaperCard from "../components/paper/papercard";
import Loading from "../components/loading";
import Span from "../components/span";
import PaperContainer from "../components/paper/papercontainer";
import PaperGrid from "../components/paper/papergrid";
import { SEMESTER, STUDY } from "../utils/constant";
import fetcher from "../utils/fetcher";
import PaperLeft from "../components/paper/paperleft";
import PaperCenter from "../components/paper/papercenter";
import PaperRight from "../components/paper/paperright";

function Leaderboard() {
  return (
    <section>
      <div className="grid grid-cols-1 mt-0 justify-items-stretch">
        <PaperCard title={"Some test  "}></PaperCard>
      </div>
    </section>
  );
}
export default Leaderboard;
