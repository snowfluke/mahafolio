import { EMPTY_STR } from "../../utils/constant";
import PaperLeft from "./paperleft";
import PaperRight from "./paperright";
import PaperRow from "./paperrow";

function EmptyPaperRow() {
  return (
    <PaperRow>
      <PaperLeft content={EMPTY_STR} />
      <PaperRight content={EMPTY_STR} />
    </PaperRow>
  );
}
export default EmptyPaperRow;
