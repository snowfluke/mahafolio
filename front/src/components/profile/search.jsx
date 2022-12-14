import { createResource, createSignal } from "solid-js";
import { folioSearchSchema } from "../../validations";
import { SEMESTER2, TYPE } from "../../utils/constant";
import { useNavigate } from "@solidjs/router";
import fetcher from "../../utils/fetcher";

import Dropdown from "../form/dropdown";
import ErrorIndicator from "../form/errorindicator";
import ButtonClassic from "../form/buttonclassic";
import ButtonAccent from "../form/buttonaccent";

import BigInput from "../home/biginput";
import Loading from "../loading";
import Span from "../span";

import PaperLeft from "../paper/paperleft";
import PaperCenter from "../paper/papercenter";
import PaperCard from "../paper/papercard";
import PaperGrid from "../paper/papergrid";
import PaperContainer from "../paper/papercontainer";

const fetchSearch = async ({ q, semester, type, id }) =>
  await fetcher(encodeURI(`/api/folio/search?mahasiswa=${id}&q=${q}&type=${type}&semester=${semester}`), {
    method: "GET",
  });

function Search({ id }) {
  const navigate = useNavigate();
  const [error, setError] = createSignal(false);
  const [searching, setSearching] = createSignal(false);
  const [searchResult] = createResource(searching, fetchSearch);

  let keyword = "",
    type,
    semester;

  async function handleSearch(e) {
    e.preventDefault();
    setError(false);

    try {
      await folioSearchSchema.validate({ q: keyword.value });
      setSearching({
        q: keyword.value,
        type: type.value,
        semester: semester.value,
        id,
      });

      keyword.value = "";
    } catch (error) {
      if (error.name == "ValidationError") {
        return setError(error.errors[0]);
      }
    }
  }

  function handleKeypress(e) {
    if (e.key !== "Enter") return;
    handleSearch(e);
  }

  return (
    <>
      <div className="flex justify-end">
        <ButtonAccent title={"Buat"} wrapperStyle={"mt-4"} action={() => navigate("/folio")} />
      </div>
      <div className="search-grid mt-4">
        <di v className="search-wrap">
          <BigInput ref={keyword} onKeyPress={handleKeypress} placeholder={"Cari folio berdasarkan judul atau mata kuliah..."} />
        </di>
      </div>
      <div className="grid grid-cols-12 mt-4 justify-items-stretch">
        <div className="col-start-1 col-end-13 mb-8">
          <div className="flex items-center justify-end space-x-4 responsive-text">
            <Dropdown items={TYPE} ref={type} />
            <Dropdown items={SEMESTER2} ref={semester} />
          </div>
          <div className="my-4 flex items-start justify-end">
            <ButtonClassic title={"Cari"} action={handleSearch} />
          </div>

          <Show when={error()}>
            <ErrorIndicator message={error()} />
          </Show>

          <PaperCard>
            <Show when={searching()} fallback={<Span text="Sekecil apapun usaha tetaplah usaha" />}>
              <Span text={`Menampilkan pencarian untuk `} variable={searching().q} />

              <Suspense fallback={<Loading />}>
                <Show when={searchResult()?.length} fallback={() => <Span text="Pencarian folio tidak ditemukan" />}>
                  <PaperContainer>
                    <For each={searchResult()}>
                      {(item) => (
                        <PaperGrid link={"/folio/" + item._id}>
                          <PaperLeft content={new Date(item.updatedAt).toLocaleDateString("id-ID")} />
                          <PaperCenter content={`[${item.type}] ${item.title}`} />
                        </PaperGrid>
                      )}
                    </For>
                  </PaperContainer>
                </Show>
              </Suspense>
            </Show>
          </PaperCard>
        </div>
      </div>
    </>
  );
}
export default Search;
