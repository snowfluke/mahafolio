import PaperContainer from "../paper/papercontainer";
import PaperRow from "../paper/paperrow";
import Span from "../span";
import PaperLeft from "../paper/paperleft";
import PaperCenter from "../paper/papercenter";
import EmptyPaperRow from "../paper/emptypaperrow";
import PaperGrid from "../paper/papergrid";
import PaperCard from "../paper/papercard";
import { capitalize, formatDate, timeFromNow } from "../../utils/string";
import { SEMESTER2, TYPE } from "../../utils/constant";

import ButtonClassic from "../form/buttonclassic";
import FolioText from "./foliotext";
import FolioDropDown from "./foliodropdown";
import FolioFile from "./foliofile";
import Loading from "../loading";

function FolioView(props) {
  return (
    <>
      <Show when={!props.loading} fallback={<Loading />}>
        <Show when={props.canEdit}>
          <div className="flex items-center space-x-4 mb-4">
            <Show when={props.data} fallback={<ButtonClassic title={"Publikasi"} />}>
              <ButtonClassic
                title={() => (props.editing ? "Batal" : "Ubah")}
                action={(e) => {
                  e.preventDefault();
                  props.setEditing();
                }}
              />
              <Show when={props.editing}>
                <ButtonClassic title={"Simpan"} />
                <ButtonClassic alter={true} title={"Hapus"} action={props.handleDelete} />
              </Show>
            </Show>
          </div>
        </Show>
      </Show>

      <PaperCard>
        <Show when={props.canEdit}>
          <Span text="Kamu dapat langsung mengubah folio di kolom yang ada" />
        </Show>

        <PaperContainer>
          <FolioText bold={true} key={"Judul: "} left="ttl." data={props.data.title} edit={props.editing} name={"title"} placeholder={"Panjang diantara 5-70 karakter ..."} />
          <FolioText key={"Deskripsi: "} left="desc." data={props.data.description} edit={props.editing} name={"description"} placeholder={"Bisa dikosongkan ..."} />
          <FolioText key={"Mata kuliah: "} left="sbj." data={props.data.subject} edit={props.editing} name={"subject"} placeholder={"Diusahakan tidak disingkat ..."} />

          <FolioDropDown left={"smt."} edit={props.editing} fallback={"Semester " + props.data.semester} items={SEMESTER2} name={"semester"} selected={props.data.semester} />

          <FolioDropDown left={"typ."} edit={props.editing} fallback={capitalize(props.data.type)} items={TYPE} name={"type"} selected={props.data.type} />
          <FolioFile setFile={props.setFile} edit={props.editing} url={props.data.url} placeholder={"https:// ... atau unggah berkas langsung"} />
          <EmptyPaperRow />

          <Show when={props.data && !props.editing}>
            <PaperRow>
              <PaperLeft content={"upd."} />
              <PaperCenter content={"Terakhir diperbarui " + timeFromNow(props.data.updatedAt)} />
            </PaperRow>
            <PaperGrid link={"/mahasiswa/" + props.author}>
              <PaperLeft content={"→"} />
              <PaperCenter content={`Dipublikasi oleh ${props.data.author.name} tanggal ${formatDate(props.data.createdAt)}`} />
            </PaperGrid>
          </Show>
        </PaperContainer>
      </PaperCard>
    </>
  );
}
export default FolioView;
