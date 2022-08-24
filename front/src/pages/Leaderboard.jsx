import { createEffect, createResource, createSignal } from "solid-js";
import Dropdown from "../components/input/dropdown";
import PaperCard from "../components/paper/papercard";
import PaperContainer from "../components/paper/papercontainer";
import PaperGrid from "../components/paper/papergrid";
import fetcher from "../utils/fetcher";

function Leaderboard() {
  const [topTen] = createResource(fetchTopTen);
  const [jurusan, setJurusan] = createSignal("");
  const [semester, setSemester] = createSignal("");

  createEffect(() => {
    console.log(topTen());
  });

  return (
    <section>
      <div className="flex items-center justify-center sm:justify-end space-x-4 responsive-text">
        <div>
          <Dropdown items={ListJurusan} signal={setJurusan}></Dropdown>
        </div>
        <div>
          <Dropdown items={ListSemester} signal={setSemester}></Dropdown>
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
              when={topTen()}
              fallback={() => <div>- Tidak terdapat klasemen saat ini</div>}
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

const fetchTopTen = async () =>
  await fetcher("/api/mahasiswa", {
    method: "GET",
  });

const ListJurusan = [
  { name: "Semua Jurusan", value: "" },
  { name: "Teknik Informatika", value: "TEKNIK INFORMATIKA" },
  { name: "Sistem Informasi", value: "SISTEM INFORMASI" },
];

const ListSemester = [
  { name: "Sepanjang Masa", value: "" },
  { name: "Semester 1", value: 1 },
  { name: "Semester 2", value: 2 },
  { name: "Semester 3", value: 3 },
  { name: "Semester 4", value: 4 },
  { name: "Semester 5", value: 5 },
  { name: "Semester 6", value: 6 },
  { name: "Semester 7", value: 7 },
  { name: "Semester 8", value: 8 },
];
