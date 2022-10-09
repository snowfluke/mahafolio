import { Link, useParams } from "@solidjs/router";
import { createEffect, createResource, createSignal } from "solid-js";
import { BACKEND_URL } from "../utils/constant";
import fetcher from "../utils/fetcher";

import HeroContainer from "../components/profile/herocontainer";
import HeroEmail from "../components/profile/heroemail";
import HeroBanner from "../components/profile/herobanner";
import HeroTitle from "../components/profile/herotitle";
import HeroPhoto from "../components/profile/herophoto";
import HeroBio from "../components/profile/herobio";

import Loading from "../components/loading";
import Search from "../components/profile/search";
import ErrorDisplay from "../components/error";
import { elipsis, timeFromNow, titleCase } from "../utils/string";
import Dropdown from "../components/form/dropdown";
import ButtonClassic from "../components/form/buttonclassic";
import { SEMESTER } from "../utils/constant";

const fetchMhs = async (id) =>
  await fetcher(encodeURI(`/api/mahasiswa/${id}`), {
    method: "GET",
  });

const fetchLatestFolio = async (id) =>
  await fetcher(encodeURI(`/api/folio/mahasiswa/${id}`), {
    method: "GET",
  });

const fetchStats = async ({ semester, id }) =>
  await fetcher(encodeURI(`/api/folio/stats/${id}?semester=${semester}`), {
    method: "GET",
  });

function Profile() {
  const mhs_id = useParams().id;
  let semester;

  const [mhs] = createResource(mhs_id, fetchMhs);
  const [latestFolio] = createResource(mhs_id, fetchLatestFolio);
  const [filtering, setFiltering] = createSignal({
    semester: "",
    id: mhs_id,
  });
  const [stats] = createResource(filtering, fetchStats);

  function handleFilter(e) {
    e.preventDefault();

    if (semester.value == filtering().semester) return;
    setFiltering({ id: mhs_id, semester: semester.value });
  }

  createEffect(() => {
    if (mhs()) {
      document.title = `Mahafolio - ${mhs().name || ""}`;
    }
  });

  return (
    <section>
      <Show when={mhs()} fallback={<Loading />}>
        <Show when={!mhs().error} fallback={<ErrorDisplay err={"404 - Halaman tidak ditemukan"} />}>
          <HeroContainer>
            <HeroEmail email={mhs().email} />
            <HeroBanner>
              <HeroTitle score={mhs().score} name={mhs().name} nim={mhs().nim} />
              <HeroPhoto fetchUri={`${BACKEND_URL}/api/photo/${mhs()._id}`} />
            </HeroBanner>
            <HeroBio study={mhs().study} semester={mhs().semester} bio={mhs().bio} />
          </HeroContainer>

          <div class={"mb-2"}>
            <span>
              Publikasi terakhir:{" "}
              <Show when={latestFolio()?.length} fallback={<>Tidak ada</>}>
                <Link href={`/folio/${latestFolio()[0]._id}`} class="hover:underline text-green">
                  [{latestFolio()[0].type}] {elipsis(latestFolio()[0].title)} ({timeFromNow(latestFolio()[0].updatedAt)})
                </Link>
              </Show>
            </span>
          </div>

          <Search id={mhs()._id} />

          <div className="mb-10">
            <h2 className="font-bold text-green text-2xl">Kemajuan</h2>
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-x-0 space-y-1 md:space-y-0 md:space-x-4 responsive-text-xs mt-1">
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start space-x-0 space-y-4 md:space-y-0 md:space-x-4 responsive-text-xs mt-6">
                <div className="flex items-center flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 space-x-0">
                  <div className={"responsive-text font-semibold px-10 py-2 tracking-widest border-y-2 bg-white text-green"}>
                    <Show when={stats()} fallback={<Loading />}>
                      {((stats().total - stats().previousTotal) / stats().previousTotal) * 100}% Performa
                    </Show>
                  </div>
                  <div className={"responsive-text font-semibold px-10 py-2 tracking-widest border-y-2 bg-white text-green"}>{stats()?.total || 0} Folio</div>
                </div>

                <div className="flex items-center space-x-4">
                  <Dropdown firstValue="Pilih semester" items={SEMESTER} selected={mhs().semester} ref={semester} />
                  <ButtonClassic title={"Filter"} action={handleFilter} />
                </div>
              </div>
            </div>

            <div className="flex flex-1 mt-6 flex-col space-y-6">
              <Show when={stats()} fallback={<Loading />}>
                <For each={stats()?.stats} fallback={<p>{stats().error}</p>}>
                  {(item) => (
                    <div className="flex sm:flex-row flex-col flex-1 items-center space-y-2">
                      <div className="flex flex-1 items-center space-x-4">
                        <label className="flex-[0.2]" for={item.name}>
                          {titleCase(item.name.toLowerCase())}:
                        </label>
                        <progress className="flex-1" id={item.name} value={item.total} max={stats().total}></progress>
                        <p className="flex-[0.1]">{(item.total / stats().total) * 100}%</p>
                      </div>
                      <p className="bg-white py-2 px-4">{item.total} Folio</p>
                    </div>
                  )}
                </For>
              </Show>
            </div>
          </div>
        </Show>
      </Show>
    </section>
  );
}
export default Profile;
