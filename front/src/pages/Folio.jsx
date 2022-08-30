import { createEffect, createResource, createSignal } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import { useAuthContext } from "../hooks/useAuthContext";
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
  const [canEdit, setCanEdit] = createSignal(false);
  const folioId = useParams().id;
  const [user] = useAuthContext();
  const [folio] = createResource(folioId, fetchFolio);
  const navigate = useNavigate();

  createEffect(() => {
    if (user().mhs && folio()) {
      if (user().mhs._id == folio().author._id) setCanEdit(user().mhs._id);
    } else {
      setCanEdit(false);
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
              <FolioPublish data={folio()} canEdit={canEdit()} />
            </div>
          </div>
        </Show>
      </Show>
    </section>
  );
}
export default Folio;
