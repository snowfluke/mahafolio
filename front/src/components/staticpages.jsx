import { useNavigate } from "@solidjs/router";
import { onMount } from "solid-js";

import ButtonAccent from "./form/buttonaccent";
import PaperCard from "./paper/papercard";
import PaperContainer from "./paper/papercontainer";

function StaticPages(props) {
  const navigate = useNavigate();
  onMount(() => {
    document.title = "Mahafolio - " + props;
  });

  return (
    <section>
      <div className="mt-6">
        <div className="flex items-center justify-end">
          <div className="flex items-center mb-8">
            <ButtonAccent title={"Kembali"} action={() => navigate(-1)} />
          </div>
        </div>
        <div className="col-start-1 col-end-13">
          <div className="flex items-center space-x-4 mb-4">
            <PaperCard>
              <PaperContainer>
                <h1 className="font-bold text-xl"> {props.title} </h1>
                <br />
                {props.children}
              </PaperContainer>
            </PaperCard>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StaticPages;
