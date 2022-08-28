import { Link, useParams } from "@solidjs/router";
import { createResource, createSignal, createEffect, Show } from "solid-js";
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

import { folioSearchSchema, updateProfileSchema } from "../validations";
import Dropdown from "../components/form/dropdown";
import { SEMESTER2, TYPE } from "../utils/constant";
import PaperLeft from "../components/paper/paperleft";
import PaperCenter from "../components/paper/papercenter";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileData } from "../hooks/useProfileData";

const [editing, setEditing] = createSignal(false);
const [error, setError] = createSignal(false);

function Profiles() {
  const [user] = useAuthContext();
  const { profileData, setProfile, updateProfile, isLoading, contextError } =
    useProfileData();

  createEffect(() => {
    if (profileData().mhs == null) setProfile(user().mhs._id);
  });

  let tempPhoto;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);

    const fields = {
      _id: user().mhs._id,
      name: e.target.name.value,
      email: e.target.email.value,
      semester: e.target.semester.value,
      study: e.target.study.value,
      bio: e.target.bio.value,
      nim: e.target.nim.value,
    };

    if (tempPhoto.value !== "") fields.photo = tempPhoto.value;

    try {
      await updateProfileSchema.validate(fields);
      let update = await updateProfile(fields);
      if (update.error) return setError(update.error);

      setEditing(false);
    } catch (error) {
      console.log(error);
      if (error.name == "ValidationError") {
        return setError(error.errors[0]);
      }
    }
  }

  return (
    <>
      <Show when={!isLoading()} fallback={<Loading />}>
        <section>
          <Show when={profileData().mhs}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <HeroContainer>
                <HeroEmail email={profileData().mhs.email} edit={editing()} />
                <HeroBanner>
                  <HeroTitle
                    score={profileData().mhs.score}
                    name={profileData().mhs.name}
                    edit={editing()}
                    nim={profileData().mhs.nim}
                  />
                  <HeroPhoto
                    ref={tempPhoto}
                    id={profileData()._id || user().mhs._id}
                    edit={editing()}
                  />
                </HeroBanner>
                <HeroBio
                  edit={editing()}
                  study={profileData().mhs.study}
                  semester={profileData().mhs.semester}
                  bio={profileData().mhs.bio}
                />
                <Show when={error()}>
                  <ErrorIndicator message={error()} />
                </Show>

                <Show
                  when={editing()}
                  fallback={
                    <ButtonClassic title={"Ubah"} action={toggleEditing} />
                  }
                >
                  <ButtonClassic
                    alter={true}
                    title={"Batal"}
                    action={() => setEditing(false)}
                  />
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
      </Show>
      <Show when={contextError()}>
        <ErrorDisplay message={contextError()} />
      </Show>
    </>
  );
}
export default Profiles;

function toggleEditing() {
  setEditing(!editing());
}
