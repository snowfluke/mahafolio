import { createSignal, createEffect } from "solid-js";
import { useAuthContext } from "../hooks/useAuthContext";
import { useProfileData } from "../hooks/useProfileData";
import { updateProfileSchema } from "../validations";
import { capitalize } from "../utils/string";

import HeroContainer from "../components/profile/herocontainer";
import HeroEmail from "../components/profile/heroemail";
import HeroBanner from "../components/profile/herobanner";
import HeroTitle from "../components/profile/herotitle";
import HeroPhoto from "../components/profile/herophoto";
import HeroBio from "../components/profile/herobio";

import ButtonClassic from "../components/form/buttonclassic";
import ErrorIndicator from "../components/form/errorindicator";

import Search from "../components/profile/search";
import ErrorDisplay from "../components/error";
import Loading from "../components/loading";
import { useNotif } from "../hooks/useNotif";
import { useSignout } from "../hooks/useSignout";

function Profiles() {
  const [user] = useAuthContext();

  const [editing, setEditing] = createSignal(false);
  const [error, setError] = createSignal(false);
  const [loading, setLoading] = createSignal(false);

  const { showNotif } = useNotif();
  const { logout } = useSignout();
  const { profileData, setProfile, updateProfile, isLoading, contextError } =
    useProfileData();

  createEffect(() => {
    if (profileData().mhs == null) return setProfile(user().mhs._id);
    document.title = `Mahafolio - ${profileData().mhs.name || ""}`;
  });

  let tempPhoto;

  async function handleSubmit(e) {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const fields = {
      name: e.target.name.value,
      email: e.target.email.value,
      semester: e.target.semester.value,
      study: e.target.study.value,
      bio: e.target.bio.value,
      nim: e.target.nim.value,
    };

    const oldEmail = profileData().mhs.email;

    let different = false;
    for (const key of Object.keys(fields)) {
      if (fields[key] != profileData().mhs[key]) {
        different = true;
        break;
      }
    }

    if (!different && tempPhoto.value == "") {
      setEditing(false);
      return setLoading(false);
    }

    if (tempPhoto.value !== "") fields.photo = tempPhoto.value;
    fields._id = user().mhs._id;
    fields.name = capitalize(fields.name);

    try {
      await updateProfileSchema.validate(fields);
      let update = await updateProfile(fields);
      if (update.error) {
        setLoading(false);
        return setError(update.error);
      }

      tempPhoto.value = "";
      setEditing(false);
      setLoading(false);
      if (oldEmail != update.email) {
        logout();
        return showNotif(
          "success",
          "Berhasil! Silakan masuk kembali dengan email baru"
        );
      }
      showNotif("success", "Berhasil mengubah profil");
    } catch (error) {
      setLoading(false);
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
                    fetchUri={profileData().mhs.fetchUri}
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
                <div className="flex space-x-4">
                  <Show
                    when={editing()}
                    fallback={
                      <ButtonClassic
                        title={"Ubah"}
                        action={() => setEditing(true)}
                      />
                    }
                  >
                    <Show when={!loading()} fallback={<Loading />}>
                      <ButtonClassic title={"Simpan"} />
                      <ButtonClassic
                        alter={true}
                        title={"Batal"}
                        action={() => {
                          setError(false);
                          setEditing(false);
                          setLoading(false);
                        }}
                      />
                    </Show>
                  </Show>
                </div>
              </HeroContainer>
            </form>

            <Search id={profileData().mhs._id} />
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
