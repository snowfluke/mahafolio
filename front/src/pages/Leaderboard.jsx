import { createEffect, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import Dropdown from "../components/input/dropdown";
import PaperCard from "../components/paper/papercard";
import PaperContainer from "../components/paper/papercontainer";
import PaperGrid from "../components/paper/papergrid";
import fetcher from "../utils/fetcher";

const fetchTopTen = async ({ study, semester }) =>
  await fetcher(
    encodeURI(
      `/api/mahasiswa?study=${study || "all"}&semester=${semester || "all"}`
    ),
    {
      method: "GET",
    }
  );

function Leaderboard() {
  const [keyword, setKeyword] = createStore({ study: "", semester: "" });
  const [topTen] = createResource(() => ({ ...keyword }), fetchTopTen);

  return (
    <section>
      <div className="flex items-center justify-center sm:justify-end space-x-4 responsive-text">
        <div>
          <Dropdown items={ListJurusan} signal={setKeyword}></Dropdown>
        </div>
        <div>
          <Dropdown items={ListSemester} signal={setKeyword}></Dropdown>
        </div>
      </div>
      <div className="grid grid-cols-12 mt-10 justify-items-stretch">
        <div className="col-start-2 justify-self-end">
          <div className="mt-14 -rotate-90">
            <button className="responsive-text r-4 border-l-2 border-r-2 bg-white tracking-widest font-semibold text-green py-2 px-10">
              Bagikan
            </button>
          </div>
        </div>
        <div className="col-start-3 -ml-8 col-end-13">
          <PaperCard title={"Klasemen perolehan poin mahafolio:"}>
            <Show
              when={topTen()?.length}
              fallback={() => (
                <span className="responsive-text">
                  - Tidak terdapat klasemen saat ini
                </span>
              )}
            >
              <PaperContainer>
                <For each={topTen()}>
                  {(item, index) => (
                    <PaperGrid data={item} index={index} color={true} />
                  )}
                </For>
              </PaperContainer>
            </Show>
          </PaperCard>
        </div>
      </div>
    </section>
  );
}
export default Leaderboard;

const ListJurusan = [
  { name: "Semua Jurusan", value: "", key: "study" },
  { name: "Teknik Informatika", value: "TEKNIK INFORMATIKA", key: "study" },
  { name: "Sistem Informasi", value: "SISTEM INFORMASI", key: "study" },
];

const ListSemester = [
  { name: "Sepanjang Masa", value: "", key: "semester" },
  { name: "Semester 1", value: 1, key: "semester" },
  { name: "Semester 2", value: 2, key: "semester" },
  { name: "Semester 3", value: 3, key: "semester" },
  { name: "Semester 4", value: 4, key: "semester" },
  { name: "Semester 5", value: 5, key: "semester" },
  { name: "Semester 6", value: 6, key: "semester" },
  { name: "Semester 7", value: 7, key: "semester" },
  { name: "Semester 8", value: 8, key: "semester" },
];
