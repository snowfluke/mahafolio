import PaperContainer from "../paper/papercontainer";
import PaperRow from "../paper/paperrow";
import Span from "../span";
import PaperLeft from "../paper/paperleft";
import PaperCenter from "../paper/papercenter";
import EmptyPaperRow from "../paper/emptypaperrow";
import PaperGrid from "../paper/papergrid";
import PaperCard from "../paper/papercard";
import {
  capitalize,
  elipsis,
  formatDate,
  timeFromNow,
} from "../../utils/string";

function FolioView({ data }) {
  return (
    <PaperCard>
      <Span text="Kamu dapat langsung mengubah folio" />
      <PaperContainer>
        <PaperRow>
          <PaperLeft content={"ttl."} />
          <b>
            <PaperCenter content={data.title} />
          </b>
        </PaperRow>
        <PaperRow>
          <PaperLeft content={"dsc."} />
          <PaperCenter content={data.description} />
        </PaperRow>

        <PaperRow>
          <PaperLeft content={"sbj."} />
          <PaperCenter content={capitalize(data.subject)} />
        </PaperRow>
        <PaperRow>
          <PaperLeft content={"smt."} />
          <PaperCenter content={"Semester " + data.semester} />
        </PaperRow>

        <PaperRow>
          <PaperLeft content={"typ."} />
          <PaperCenter content={capitalize(data.type)} />
        </PaperRow>
        <PaperGrid link={data.url}>
          <PaperLeft content={"→"} />
          <PaperCenter content={elipsis(data.url)} />
        </PaperGrid>
        <EmptyPaperRow />

        <PaperRow>
          <PaperLeft content={"upd."} />
          <PaperCenter
            content={"Terakhir diperbarui " + timeFromNow(data.updatedAt)}
          />
        </PaperRow>
        <PaperGrid link={"mahasiswa/" + data.author._id}>
          <PaperLeft content={"→"} />
          <PaperCenter
            content={`Dipublikasi oleh ${data.author.name} tanggal ${formatDate(
              data.createdAt
            )}`}
          />
        </PaperGrid>
      </PaperContainer>
    </PaperCard>
  );
}
export default FolioView;
