import ButtonAccent from "../components/form/buttonaccent";

import { useNavigate } from "@solidjs/router";
import FolioView from "../components/folio/folioview";
import { useAuthContext } from "../hooks/useAuthContext";
import ButtonClassic from "../components/form/buttonclassic";

function Folios() {
  const [user] = useAuthContext();
  const navigate = useNavigate();

  return (
    <section>
      <Show
        when={user().mhs}
        fallback={<ErrorDisplay err={"503 - Akses Ilegal"} />}
      >
        <div className="grid grid-cols-12 mt-0 justify-items-stretch">
          <div className="col-start-2 justify-self-end">
            <ButtonAccent
              title={"Kembali"}
              wrapperStyle={"mt-14 -rotate-90"}
              action={() => navigate(-1)}
            />
          </div>
          <div className="col-start-3 -ml-8 col-end-13">
            <FolioView data={false} edit={true} />
          </div>
        </div>
      </Show>
    </section>
  );
}
export default Folios;
