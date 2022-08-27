import { createResource, Suspense } from "solid-js";
import { createStore } from "solid-js/store";
import ButtonAccent from "../components/form/buttonaccent";
import Dropdown from "../components/form/dropdown";
import PaperCard from "../components/paper/papercard";
import Loading from "../components/loading";
import Span from "../components/span";
import PaperContainer from "../components/paper/papercontainer";
import PaperGrid from "../components/paper/papergrid";
import { SEMESTER, STUDY } from "../utils/constant";
import fetcher from "../utils/fetcher";
import PaperLeft from "../components/paper/paperleft";
import PaperCenter from "../components/paper/papercenter";
import PaperRight from "../components/paper/paperright";

const fetchTopTen = async ({ study, semester }) =>
  await fetcher(
    encodeURI(`/api/mahasiswa?study=${study}&semester=${semester}`),
    {
      method: "GET",
    }
  );

function Leaderboard() {
  const [keyword, setKeyword] = createStore({ study: "", semester: "" });
  const [topTen] = createResource(() => ({ ...keyword }), fetchTopTen);
  let study, semester;

  return (
    <section>
      <div className="flex items-center justify-center sm:justify-end space-x-4 responsive-text">
        <Dropdown
          items={STUDY}
          onChange={() => setKeyword("study", study.value)}
          ref={study}
        />
        <Dropdown
          items={SEMESTER}
          onChange={() => setKeyword("semester", semester.value)}
          ref={semester}
        />
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
            <Span text="Klasemen perolehan poin mahafolio:" />
            <Suspense fallback={<Loading />}>
              <Show
                when={topTen()?.length}
                fallback={() => <Span text="Hasil klasemen tidak ditemukan" />}
              >
                <PaperContainer>
                  <For each={topTen()}>
                    {(item, index) => (
                      <PaperGrid link={"/mahasiswa/" + item._id}>
                        <PaperLeft color={index() + 1} content={index() + 1} />
                        <PaperCenter
                          content={item.name}
                          emoji={true}
                          index={index()}
                        />
                        <PaperRight content={item.score + "pts"} />
                      </PaperGrid>
                    )}
                  </For>
                </PaperContainer>
              </Show>
            </Suspense>
          </PaperCard>
        </div>
      </div>
    </section>
  );
}
export default Leaderboard;
