import PaperRow from "../paper/paperrow";
import PaperLeft from "../paper/paperleft";
import PaperCenter from "../paper/papercenter";
import FolioInput from "./folioinput";

function FolioText(props) {
  return (
    <PaperRow>
      <PaperLeft content={props.left} />
      <Show when={props.edit} fallback={<PaperCenter content={props.data} />}>
        <PaperCenter bold={props.bold}>
          {props.key}
          <FolioInput
            name={props.name}
            value={props.data}
            placeholder={props.placeholder}
          />
        </PaperCenter>
      </Show>
    </PaperRow>
  );
}
export default FolioText;
