import { Link, useParams } from "@solidjs/router";
import { createEffect, createResource } from "solid-js";
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
import { elipsis, timeFromNow } from "../utils/string";

const fetchMhs = async (id) =>
  await fetcher(encodeURI(`/api/mahasiswa/${id}`), {
    method: "GET",
  });

const fetchLatestFolio = async (id) =>
  await fetcher(encodeURI(`/api/folio/mahasiswa/${id}`), {
    method: "GET",
  });

function Profile() {
  const mhs_id = useParams().id;

  const [mhs] = createResource(mhs_id, fetchMhs);
  const [latestFolio] = createResource(mhs_id, fetchLatestFolio);

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
        </Show>
      </Show>
    </section>
  );
}
export default Profile;
