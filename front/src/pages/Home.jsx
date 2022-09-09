import { useNavigate } from "@solidjs/router";
import { createSignal, Suspense, createResource } from "solid-js";
import { useAuthContext } from "../hooks/useAuthContext";
import { useSignout } from "../hooks/useSignout";
import { searchSchema } from "../validations";
import fetcher from "../utils/fetcher";

import ButtonAccent from "../components/form/buttonaccent";
import ErrorIndicator from "../components/form/errorindicator";
import ButtonClassic from "../components/form/buttonclassic";

import PaperCard from "../components/paper/papercard";
import PaperGrid from "../components/paper/papergrid";
import PaperContainer from "../components/paper/papercontainer";
import PaperLeft from "../components/paper/paperleft";
import PaperCenter from "../components/paper/papercenter";

import Welcome from "../components/home/welcome";
import BigInput from "../components/home/biginput";
import Loading from "../components/loading";
import Span from "../components/span";

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
    <section>
      <div className="search-grid">
        <div className="search-wrap">
          <BigInput
            ref={keyword}
            onKeyPress={handleKeypress}
            placeholder={
              "Cari kemajuan mahasiswa berdasarkan nama, email atau nim..."
            }
          />
        </div>
      </div>

      <div className="home-paper-grid">
        <div className="home-btn-wrap">
          <Show
            when={!user().mhs}
            fallback={
              <ButtonAccent
                title={"Keluar"}
                wrapperStyle={"home-btn-rotate"}
                variant={true}
                action={logout}
              />
            }
          >
            <ButtonAccent
              title={"Masuk"}
              wrapperStyle={"home-btn-rotate"}
              action={() => navigate("/coretan")}
            />
          </Show>
        </div>

        <div className="home-paper-wrap">
          <div className="home-paper-wrap-btn">
            <ButtonClassic title={"Cari"} action={handleSearch} />
            <Show when={user().mhs && !user().mhs.admin}>
              <Welcome to={user().mhs.email} />
            </Show>
          </div>

          <Show when={error()}>
            <ErrorIndicator message={error()} />
          </Show>

          <PaperCard>
            <Show
              when={searching()}
              fallback={<Span text="Semua berawal dari keingintahuaan." />}
            >
              <Span
                text={`Menampilkan pencarian untuk `}
                variable={searching()}
              />

              <Suspense fallback={<Loading />}>
                <Show
                  when={searchResult()?.length}
                  fallback={() => (
                    <Span text="Pencarian mahasiswa tidak ditemukan" />
                  )}
                >
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
