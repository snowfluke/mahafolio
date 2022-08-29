import { createEffect, createResource, createSignal } from "solid-js";
import ButtonAccent from "../components/form/buttonaccent";
import Loading from "../components/loading";

import fetcher from "../utils/fetcher";

import { useNavigate, useParams } from "@solidjs/router";
import FolioView from "../components/folio/folioview";
import { useAuthContext } from "../hooks/useAuthContext";
import ErrorIndicator from "../components/form/errorindicator";

const fetchFolio = async (id) =>
  await fetcher(encodeURI(`/api/folio/${id}`), {
    method: "GET",
  });

function Folio() {
  const [canEdit, setCanEdit] = createSignal(false);
  const [error, setError] = createSignal("");
  const folioId = useParams().id;
  const [user] = useAuthContext();
  const [folio] = createResource(folioId, fetchFolio);
  const navigate = useNavigate();

  createEffect(() => {
    if (user().mhs && folio()) {
      if (user().mhs._id == folio().author._id) setCanEdit(true);
    } else {
      setCanEdit(false);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    let fields = {
      title: e.target.title.value,
      description: e.target.description.value,
      subject: e.target.subject.value,
      semester: e.target.semester.value,
      type: e.target.type.value,
      url: "",
      file: "",
    };

    console.log(fields);
  };

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
              <Show
                when={canEdit()}
                fallback={<FolioView data={folio()} edit={false} />}
              >
                <form onSubmit={handleSubmit}>
                  <Show when={error()}>
                    <ErrorIndicator message={error()} />
                  </Show>
                  <FolioView data={folio()} edit={canEdit()} />
                </form>
              </Show>
            </div>
          </div>
        </Show>
      </Show>
    </section>
  );
}
export default Folio;
