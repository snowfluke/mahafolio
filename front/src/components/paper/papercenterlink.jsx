import { Link } from "@solidjs/router";
import PaperCenter from "./papercenter";

function PaperCenterLink(props) {
  return (
    <Link href={props.link} target="_blank">
      <PaperCenter {...props} />
    </Link>
  );
}
export default PaperCenterLink;
