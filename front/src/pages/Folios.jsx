import { createResource, Suspense } from "solid-js";
import { createStore } from "solid-js/store";
import ButtonAccent from "../components/form/buttonaccent";
import Dropdown from "../components/form/dropdown";
import PaperCard from "../components/paper/papercard";
import Loading from "../components/loading";
import Span from "../components/span";
import PaperContainer from "../components/paper/papercontainer";
import PaperRow from "../components/paper/paperrow";
import { EMPTY_STR, SEMESTER, STUDY } from "../utils/constant";
import fetcher from "../utils/fetcher";
import PaperLeft from "../components/paper/paperleft";
import PaperCenter from "../components/paper/papercenter";
import EmptyPaperRow from "../components/paper/emptypaperrow";
import PaperGrid from "../components/paper/papergrid";
import ButtonClassic from "../components/form/buttonclassic";
import { useNavigate } from "@solidjs/router";
import ActionButton from "../components/form/actionbutton";

function Folio() {
  const navigate = useNavigate();

  return (
    <section>
      <div className="grid grid-cols-12 mt-0 justify-items-stretch">
        <div className="col-start-2 justify-self-end">
          <ButtonAccent
            title={"Kembali"}
            wrapperStyle={"mt-14 -rotate-90"}
            action={() => {
              console.log("Bagikan clicked");
            }}
          />
        </div>
        <div className="col-start-3 -ml-8 col-end-13">
          <div className="flex items-center space-x-4 mb-4">
            <ButtonClassic title={"Simpan"} action={() => {}} />
            <ButtonClassic alter={true} title={"Hapus"} action={() => {}} />
          </div>
          <PaperCard>
            <Span text="Kamu dapat langsung mengubah folio" />
            <PaperContainer>
              <PaperRow>
                <PaperLeft content={"ttl."} />
                <b>
                  <PaperCenter content={"Cross token experiment"} />
                </b>
              </PaperRow>
              <PaperRow>
                <PaperLeft content={"dsc."} />
                <PaperCenter content={"Do something with legacy code"} />
              </PaperRow>

              <PaperRow>
                <PaperLeft content={"sbj."} />
                <PaperCenter content={"Pemrograman Dasar"} />
              </PaperRow>
              <PaperRow>
                <PaperLeft content={"smt."} />
                <PaperCenter content={"Semester 1"} />
              </PaperRow>

              <PaperRow>
                <PaperLeft content={"typ."} />
                <PaperCenter content={"Catatan"} />
              </PaperRow>
              <PaperGrid
                link={"https://drive.google.com/uc?id=8786ca7sd67avdag7ds"}
              >
                <PaperLeft content={"-->"} />
                <PaperCenter
                  content={
                    "https://drive.google.com/uc?id=8786ca7sd67avdag7ds..."
                  }
                />
              </PaperGrid>
              <EmptyPaperRow />

              <PaperRow>
                <PaperLeft content={"upd."} />
                <PaperCenter
                  content={
                    "Terakhir diperbarui tanggal 24/8/2022 pukul 22.04.05"
                  }
                />
              </PaperRow>
              <PaperGrid link={"mahasiswa/id"}>
                <PaperLeft content={"-->"} />
                <PaperCenter
                  content={
                    "Dipublikasi oleh Awal Ariansyah tanggal 24/8/2022 pukul 22.04.05"
                  }
                />
              </PaperGrid>
            </PaperContainer>
          </PaperCard>
        </div>
      </div>
    </section>
  );
}
export default Folio;
