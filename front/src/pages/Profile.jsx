import { Link, useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal, Show } from "solid-js";

import ButtonAccent from "../components/form/buttonaccent";
import HeroContainer from "../components/profile/herocontainer";
import HeroEmail from "../components/profile/heroemail";
import HeroBanner from "../components/profile/herobanner";
import HeroTitle from "../components/profile/herotitle";
import HeroPhoto from "../components/profile/herophoto";
import HeroBio from "../components/profile/herobio";
import Loading from "../components/loading";
import PaperCard from "../components/paper/papercard";
import PaperGrid from "../components/paper/papergrid";
import PaperContainer from "../components/paper/papercontainer";
import BigInput from "../components/home/biginput";
import ButtonClassic from "../components/form/buttonclassic";
import fetcher from "../utils/fetcher";
import Span from "../components/span";
import ErrorIndicator from "../components/form/errorindicator";

import { folioSearchSchema } from "../validations";
import Dropdown from "../components/form/dropdown";
import { SEMESTER2, TYPE } from "../utils/constant";
import PaperLeft from "../components/paper/paperleft";
import PaperCenter from "../components/paper/papercenter";

const fetchMhs = async (id) =>
  await fetcher(encodeURI(`/api/mahasiswa/${id}`), {
    method: "GET",
  });

const fetchLatestFolio = async (id) =>
  await fetcher(encodeURI(`/api/folio/mahasiswa/${id}`), {
    method: "GET",
  });

const fetchSearch = async ({ q, semester, type, id }) =>
  await fetcher(
    encodeURI(
      `/api/folio/search?mahasiswa=${id}&q=${q}&type=${type}&semester=${semester}`
    ),
    {
      method: "GET",
    }
  );

function Profile() {
  const mhs_id = useParams().id;
  const [mhs] = createResource(mhs_id, fetchMhs);
  const [searching, setSearching] = createSignal(false);
  const [latestFolio] = createResource(mhs_id, fetchLatestFolio);
  const [searchResult] = createResource(searching, fetchSearch);

  const [error, setError] = createSignal(false);

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
        id: mhs_id,
      });
      keyword.value = "";
    } catch (error) {
      console.log(error);
      setError(error.errors[0]);
    }
  }

  function handleKeypress(e) {
    if (e.key !== "Enter") return;
    handleSearch(e);
  }
  return (
    <section>
      <Show when={mhs()}>
        <HeroContainer>
          <HeroEmail email={mhs().email} />
          <HeroBanner>
            <HeroTitle score={mhs().score} name={mhs().name} />
            <HeroPhoto photo={mhs().photo} />
          </HeroBanner>
          <HeroBio
            study={mhs().study}
            semester={mhs().semester}
            bio={mhs().bio}
          />
        </HeroContainer>

        <div class={"mb-2"}>
          <span>
            Publikasi terakhir:{" "}
            <Show when={latestFolio()?.length}>
              <Link
                href={`/folio/${latestFolio()[0]._id}`}
                class="hover:underline text-green"
              >
                [{latestFolio()[0].type}] {latestFolio()[0].title}
              </Link>
            </Show>
          </span>
        </div>

        <div className="grid grid-cols-12">
          <di v className="col-start-1 md:col-start-2 col-end-13 md:col-end-12">
            <BigInput
              ref={keyword}
              onKeyPress={handleKeypress}
              placeholder={"Cari folio berdasarkan judul atau mata kuliah..."}
            />
          </di>
        </div>
        <div className="grid grid-cols-12 mt-4 justify-items-stretch">
          <div className="col-start-2 justify-self-end">
            <ButtonAccent
              title={"Buat"}
              wrapperStyle={"mt-14 -rotate-90"}
              action={() => navigate("/coretan")}
            />
          </div>
          <div className="col-start-3 -ml-8 col-end-13">
            <div className="flex items-center space-x-8 mb-4">
              <Dropdown items={TYPE} ref={type} />
              <Dropdown items={SEMESTER2} ref={semester} />
              <ButtonClassic title={"Cari"} action={handleSearch} />
            </div>

            <Show when={error()}>
              <ErrorIndicator message={error()} />
            </Show>

            <PaperCard>
              <Show
                when={searching()}
                fallback={<Span text="Sekecil apapun usaha tetaplah usaha" />}
              >
                <Span
                  text={`Menampilkan pencarian untuk `}
                  variable={searching().q}
                />

                <Suspense fallback={<Loading />}>
                  <Show
                    when={searchResult()?.length}
                    fallback={() => (
                      <Span text="Pencarian folio tidak ditemukan" />
                    )}
                  >
                    <PaperContainer>
                      <For each={searchResult()}>
                        {(item, index) => (
                          <PaperGrid link={"/folio/" + item._id}>
                            <PaperLeft content={index() + 1} />
                            <PaperCenter
                              content={`[${item.type}] ${item.title}`}
                            />
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
      </Show>
    </section>
  );
}
export default Profile;
