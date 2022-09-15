import { createSignal, Suspense, createResource } from "solid-js";
import { searchSchema } from "../validations";
import fetcher from "../utils/fetcher";

import PaperCard from "../components/paper/papercard";
import PaperRow from "../components/paper/paperrow";
import PaperContainer from "../components/paper/papercontainer";
import PaperLeft from "../components/paper/paperleft";
import PaperCenterLink from "../components/paper/papercenterlink";

import ButtonClassic from "../components/form/buttonclassic";
import ErrorIndicator from "../components/form/errorindicator";

import BigInput from "../components/home/biginput";
import Loading from "../components/loading";
import Span from "../components/span";
import PaperRightAction from "../components/paper/paperrightaction";
import { useModal } from "../hooks/useModal";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNotif } from "../hooks/useNotif";

const fetchSearch = async (keyword) =>
  await fetcher(encodeURI(`/api/mahasiswa/search/${keyword}`), {
    method: "GET",
  });

const deleteMahasiswa = async (id, token) =>
  await fetcher("/api/admin/mahasiswa/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

function Dashboard() {
  const [searching, setSearching] = createSignal(false);
  const [searchResult] = createResource(searching, fetchSearch);

  const { showModal, closeModal } = useModal();
  const [user] = useAuthContext();
  const { showNotif } = useNotif();

  const [error, setError] = createSignal(false);
  let keyword;

  async function handleSearch(e) {
    e.preventDefault();
    setError(false);

    try {
      await searchSchema.validate({ keyword: keyword.value });

      setSearching(keyword.value);
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

  function confirmDelete(id, name, nim) {
    showModal({
      title: `Apakah kamu yakin ingin menghapus mahasiswa?`,
      description: `Mahasiswa "${name} (${nim})" akan dihapus dan seluruh berkas di Google Drive yang bersangkutan akan ikut dihapus`,
      actionName: "Hapus",
      ok: (e) => handleDelete(e, id, user().mhs.admin.token),
      children: "",
    });
  }

  async function handleDelete(e, id, token) {
    e.preventDefault();
    try {
      setSearching(false);
      showNotif("success", "Menghapus...");
      closeModal();
      const deleted = await deleteMahasiswa(id, token);
      showNotif("success", "Berhasil menghapus mahasiswa");
      setSearching(keyword.value);
    } catch (error) {
      showNotif("error", error.message);
    }
  }

  return (
    <section>
      <div className="grid grid-cols-12">
        <div className="col-start-1 col-end-13">
          <BigInput
            ref={keyword}
            onKeyPress={handleKeypress}
            placeholder={"Cari mahasiswa berdasarkan nama, email atau nim..."}
          />
        </div>
      </div>

      <div className="grid grid-cols-12 mt-2 justify-items-stretch">
        <div className="col-start-1 col-end-13">
          <div className="flex items-center space-x-8 mb-4 justify-center">
            <ButtonClassic title={"Cari"} action={handleSearch} />
          </div>

          <Show when={error()}>
            <ErrorIndicator message={error()} />
          </Show>

          <PaperCard>
            <Show
              when={searching()}
              fallback={
                <Span text="Bukan kesalahan jika berusaha diperbaiki" />
              }
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
                        <PaperRow>
                          <PaperLeft content={index() + 1} />
                          <PaperCenterLink
                            link={"/mahasiswa/" + item._id}
                            content={`${item.nim} _ ${item.name}`}
                          />
                          <PaperRightAction
                            content={"Hapus"}
                            action={() =>
                              confirmDelete(item._id, item.name, item.nim)
                            }
                          />
                        </PaperRow>
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
export default Dashboard;
