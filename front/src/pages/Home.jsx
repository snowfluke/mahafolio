import { useNavigate } from "@solidjs/router";
import { createSignal, Suspense, createResource } from "solid-js";

import ButtonAccent from "../components/form/buttonaccent";
import Loading from "../components/loading";
import PaperCard from "../components/paper/papercard";
import PaperGrid from "../components/paper/papergrid";
import PaperContainer from "../components/paper/papercontainer";
import Welcome from "../components/home/welcome";
import ButtonClassic from "../components/form/buttonclassic";
import fetcher from "../utils/fetcher";
import ErrorIndicator from "../components/form/errorindicator";
import BigInput from "../components/home/biginput";
import Span from "../components/span";

import { searchSchema } from "../validations";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignout } from "../hooks/useSignout";
import PaperLeft from "../components/paper/paperleft";
import PaperCenter from "../components/paper/papercenter";

const fetchSearch = async (keyword) =>
  await fetcher(encodeURI(`/api/mahasiswa/search/${keyword}`), {
    method: "GET",
  });

function Home() {
  const [searching, setSearching] = createSignal(false);
  const [searchResult] = createResource(searching, fetchSearch);

  const [error, setError] = createSignal(false);

  const navigate = useNavigate();
  const [user] = useAuthContext();
  const { logout } = useSignout();

  let keyword;

  async function handleSearch(e) {
    e.preventDefault();
    setError(false);

    try {
      await searchSchema.validate({ keyword: keyword.value });
      setSearching(keyword.value);
      keyword.value = "";
    } catch (error) {
      setError(error.errors[0]);
    }
  }

  function handleKeypress(e) {
    if (e.key !== "Enter") return;
    handleSearch(e);
  }

  return (
    <section>
      <div className="grid grid-cols-12">
        <div className="col-start-1 md:col-start-2 col-end-13 md:col-end-12">
          <BigInput ref={keyword} onKeyPress={handleKeypress} placeholder={"Cari kemajuan mahasiswa berdasarkan nama, email atau nim..."} />
        </div>
      </div>

      <div className="grid grid-cols-12 mt-4 justify-items-stretch">
        <div className="col-start-2 justify-self-end">
          <Show when={!user().mhs} fallback={<ButtonAccent title={"Keluar"} wrapperStyle={"mt-14 -rotate-90"} variant={true} action={logout} />}>
            <ButtonAccent title={"Masuk"} wrapperStyle={"mt-14 -rotate-90"} action={() => navigate("/coretan")} />
          </Show>
        </div>

        <div className="col-start-3 -ml-8 col-end-13">
          <div className="flex items-center space-x-8 mb-4">
            <ButtonClassic title={"Cari"} action={handleSearch} />
            <Show when={user().mhs}>
              <Welcome to={user().mhs.email} />
            </Show>
          </div>

          <Show when={error()}>
            <ErrorIndicator message={error()} />
          </Show>

          <PaperCard>
            <Show when={searching()} fallback={<Span text="Semua berawal dari keingintahuaan" />}>
              <Span text={`Menampilkan pencarian untuk `} variable={searching()} />

              <Suspense fallback={<Loading />}>
                <Show when={searchResult()?.length} fallback={() => <Span text="Pencarian mahasiswa tidak ditemukan" />}>
                  <PaperContainer>
                    <For each={searchResult()}>
                      {(item, index) => (
                        <PaperGrid link={"/mahasiswa/" + item._id}>
                          <PaperLeft content={index() + 1} />
                          <PaperCenter content={`${item.nim} _ ${item.name}`} />
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
    </section>
  );
}
export default Home;
