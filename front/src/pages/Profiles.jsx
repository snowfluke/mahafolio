import { Link, useParams } from "@solidjs/router";
import { createResource, createSignal, Show } from "solid-js";
import { useNavigate } from "@solidjs/router";

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
import { useAuthContext } from "../hooks/useAuthContext";

const fetchMhs = async (id) =>
  await fetcher(encodeURI(`/api/mahasiswa/${id}`), {
    method: "GET",
  });

const [editing, setEditing] = createSignal(false);
const [error, setError] = createSignal(false);

function Profiles() {
  const navigate = useNavigate();
  const [user] = useAuthContext();
  const [mhs] = createResource(user().mhs._id, fetchMhs);

  function handleSubmit(e) {
    e.preventDefault();
    const fields = {
      _id: mhs().id,
      name: e.target.name.value,
      email: e.target.email.value,
      semester: e.target.semester.value,
      study: e.target.study.value,
      bio: e.target.bio.value,
    };

    console.log(fields);
  }

  return (
    <section>
      <Show when={mhs()}>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <HeroContainer>
            <HeroEmail email={mhs().email} edit={editing()} />
            <HeroBanner>
              <HeroTitle
                score={mhs().score}
                name={mhs().name}
                edit={editing()}
                nim={mhs().nim}
              />
              <HeroPhoto photo={mhs().photo} edit={editing()} />
            </HeroBanner>
            <HeroBio
              edit={editing()}
              study={mhs().study}
              semester={mhs().semester}
              bio={mhs().bio}
            />
            <Show when={error()}>
              <ErrorIndicator message={error()} />
            </Show>

            <Show
              when={editing()}
              fallback={<ButtonClassic title={"Ubah"} action={toggleEditing} />}
            >
              <ButtonClassic title={"Simpan"} />
            </Show>
          </HeroContainer>
        </form>

        <div className="grid grid-cols-12 mt-8 justify-items-stretch">
          <div className="col-start-2 justify-self-end">
            <ButtonAccent
              title={"Publikasi"}
              wrapperStyle={"mt-14 -rotate-90"}
              action={() => console.log("Buat button clicked")}
            />
          </div>
          <div className="col-start-3 -ml-8 col-end-13">
            <PaperCard>
              <Span text="Sekecil apapun usaha tetaplah usaha" />
            </PaperCard>
          </div>
        </div>
      </Show>
    </section>
  );
}
export default Profiles;

function toggleEditing() {
  setEditing(!editing());
}
