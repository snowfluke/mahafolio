import { createEffect, createResource } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import fetcher from "../utils/fetcher";

import FolioPublish from "../components/folio/foliopublish";
import ButtonAccent from "../components/form/buttonaccent";
import ErrorDisplay from "../components/error";
import Loading from "../components/loading";

const fetchFolio = async (id) =>
  await fetcher(encodeURI(`/api/folio/${id}`), {
    method: "GET",
  });

function Folio() {
  const folioId = useParams().id;
  const [folio] = createResource(folioId, fetchFolio);
  const navigate = useNavigate();

  createEffect(() => {
    if (folio()) {
      document.title = `Mahafolio - ${folio().title}`;
    }
  });

  return (
    <section>
      <Show when={folio()} fallback={<Loading />}>
        <Show
          when={!folio().error}
          fallback={<ErrorDisplay err={"404 - Halaman tidak ditemukan"} />}
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
              <FolioPublish data={folio()} authorId={folio().author._id} />
            </div>
          </div>
        </Show>
      </Show>
    </section>
  );
}
export default Folio;
