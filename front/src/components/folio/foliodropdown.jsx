import PaperRow from "../paper/paperrow";
import PaperLeft from "../paper/paperleft";
import PaperCenter from "../paper/papercenter";
import Dropdown from "../form/dropdown";

function FolioDropDown(props) {
  return (
    <PaperRow>
      <PaperLeft content={props.left} />
      <Show
        when={props.edit}
        fallback={<PaperCenter content={props.fallback} />}
      >
        <PaperCenter>
          <Dropdown
            items={props.items}
            name={props.name}
            selected={props.selected}
          />
        </PaperCenter>
      </Show>
    </PaperRow>
  );
}
export default FolioDropDown;
