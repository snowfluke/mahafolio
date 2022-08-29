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

function FolioView(props) {
  let url, file;

  return (
    <>
      <Show when={props.edit}>
        <div className="flex items-center space-x-4 mb-4">
          <ButtonClassic title={"Simpan"} />
          <ButtonClassic alter={true} title={"Hapus"} action={() => {}} />
        </div>
      </Show>
      <PaperCard>
        <Show when={props.edit}>
          <Span text="Kamu dapat langsung mengubah folio di kolom yang ada" />
        </Show>

        <PaperContainer>
          <FolioText
            bold={true}
            key={"Judul: "}
            left="ttl."
            data={props.data.title}
            edit={props.edit}
            name={"title"}
          />
          <FolioText
            key={"Deskripsi: "}
            left="desc."
            data={props.data.description}
            edit={props.edit}
            name={"description"}
          />
          <FolioText
            key={"Mata kuliah: "}
            left="sbj."
            data={props.data.subject}
            edit={props.edit}
            name={"subject"}
          />

          <FolioDropDown
            left={"smt."}
            edit={props.edit}
            fallback={"Semester " + props.data.semester}
            items={SEMESTER2}
            name={"semester"}
            selected={props.data.semester}
          />

          <FolioDropDown
            left={"typ."}
            edit={props.edit}
            fallback={capitalize(props.data.type)}
            items={TYPE}
            name={"type"}
            selected={props.data.type}
          />
          <FolioFile
            edit={props.edit}
            url={url}
            file={file}
            data={{ url: props.data.url }}
          />
          <EmptyPaperRow />

          <Show when={!props.edit}>
            <PaperRow>
              <PaperLeft content={"upd."} />
              <PaperCenter
                content={
                  "Terakhir diperbarui " + timeFromNow(props.data.updatedAt)
                }
              />
            </PaperRow>
            <PaperGrid link={"mahasiswa/" + props.data.author._id}>
              <PaperLeft content={"→"} />
              <PaperCenter
                content={`Dipublikasi oleh ${
                  props.data.author.name
                } tanggal ${formatDate(props.data.createdAt)}`}
              />
            </PaperGrid>
          </Show>
        </PaperContainer>
      </PaperCard>
    </>
  );
}
export default FolioView;
