import { createEffect, createResource } from "solid-js";
import { createStore } from "solid-js/store";
import ButtonAccent from "../components/form/buttonaccent";
import Dropdown from "../components/form/dropdown";
import PaperCard from "../components/paper/papercard";
import PaperContainer from "../components/paper/papercontainer";
import PaperGrid from "../components/paper/papergrid";
import { SEMESTER, STUDY } from "../utils/constant";
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
        <Dropdown items={STUDY} signal={setKeyword}></Dropdown>
        <Dropdown items={SEMESTER} signal={setKeyword}></Dropdown>
      </div>
      <div className="grid grid-cols-12 mt-10 justify-items-stretch">
        <div className="col-start-2 justify-self-end">
          <ButtonAccent
            title={"Bagikan"}
            wrapperStyle={"mt-14 -rotate-90"}
            action={() => {
              console.log("Bagikan clicked");
            }}
          />
        </div>
        <div className="col-start-3 -ml-8 col-end-13">
          <PaperCard title={"Klasemen perolehan poin mahafolio:"}>
            <Show
              when={topTen()?.length}
              fallback={() => (
                <span className="responsive-text">
                  {" "}
                  Tidak terdapat klasemen saat ini
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
