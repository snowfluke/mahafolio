import { createEffect, createResource } from "solid-js";
import ButtonAccent from "../components/form/buttonaccent";
import Loading from "../components/loading";

import fetcher from "../utils/fetcher";

import { useNavigate, useParams } from "@solidjs/router";
import FolioView from "../components/folio/folioview";

const fetchFolio = async (id) =>
  await fetcher(encodeURI(`/api/folio/${id}`), {
    method: "GET",
  });

function Folio() {
  const folioId = useParams().id;
  const [folio] = createResource(folioId, fetchFolio);

  const navigate = useNavigate();

  createEffect(() => {
    console.log(folio());
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
              <FolioView data={folio()} />
            </div>
          </div>
        </Show>
      </Show>
    </section>
  );
}
export default Folio;
