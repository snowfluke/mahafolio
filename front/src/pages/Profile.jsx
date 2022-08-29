import { Link, useParams } from "@solidjs/router";
import { createResource } from "solid-js";

import HeroContainer from "../components/profile/herocontainer";
import HeroEmail from "../components/profile/heroemail";
import HeroBanner from "../components/profile/herobanner";
import HeroTitle from "../components/profile/herotitle";
import HeroPhoto from "../components/profile/herophoto";
import HeroBio from "../components/profile/herobio";
import Loading from "../components/loading";

import fetcher from "../utils/fetcher";
import Search from "../components/profile/search";
import { BACKEND_URL } from "../utils/constant";

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

  return (
    <section>
      <Show when={mhs() && !mhs().error} fallback={<Loading />}>
        <HeroContainer>
          <HeroEmail email={mhs().email} />
          <HeroBanner>
            <HeroTitle score={mhs().score} name={mhs().name} nim={mhs().nim} />
            <HeroPhoto fetchUri={`${BACKEND_URL}/api/photo/${mhs()._id}`} />
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
            <Show when={latestFolio()?.length} fallback={<>Tidak ada</>}>
              <Link
                href={`/folio/${latestFolio()[0]._id}`}
                class="hover:underline text-green"
              >
                [{latestFolio()[0].type}] {latestFolio()[0].title}
              </Link>
            </Show>
          </span>
        </div>

        <Search id={mhs()._id} />
      </Show>
    </section>
  );
}
export default Profile;
