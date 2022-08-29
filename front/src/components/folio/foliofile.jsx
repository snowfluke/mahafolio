import { createSignal } from "solid-js";
import { EMPTY_STR } from "../../utils/constant";
import { elipsis } from "../../utils/string";
import Dropdown from "../form/dropdown";
import PaperCenter from "../paper/papercenter";
import PaperGrid from "../paper/papergrid";
import PaperLeft from "../paper/paperleft";
import PaperRow from "../paper/paperrow";
import FolioInput from "./folioinput";

function FolioFile(props) {
  const [link, setLink] = createSignal(true);

  return (
    <Show
      when={props.edit}
      fallback={
        <PaperGrid link={props.data.url}>
          <PaperLeft content={"→"} />
          <PaperCenter content={elipsis(props.data.url)} />
        </PaperGrid>
      }
    >
      <PaperRow>
        <PaperLeft content={EMPTY_STR} />
        <PaperCenter>
          <Dropdown
            items={[
              { value: "url", name: "Unggah Link" },
              { value: "file", name: "Unggah Berkas" },
            ]}
            onChange={() => setLink(!link())}
          />
        </PaperCenter>
      </PaperRow>
      <Show
        when={link()}
        fallback={
          <>
            <PaperRow>
              <PaperLeft content={"→"} />
              <PaperCenter>
                <input type={"file"} onChange={() => {}} />
                <input type="hidden" ref={props.file} />
              </PaperCenter>
            </PaperRow>
            <PaperRow>
              <PaperLeft content={EMPTY_STR} />
              <PaperCenter>
                Ukuran maksimal 2MB, lakukan kompresi sebelum mengunggah berkas
              </PaperCenter>
            </PaperRow>
          </>
        }
      >
        <PaperRow>
          <PaperLeft content={"→"} />
          <PaperCenter>
            URL:
            <FolioInput ref={props.url} value={props.data.url} />
          </PaperCenter>
        </PaperRow>
        <PaperRow>
          <PaperLeft content={EMPTY_STR} />
          <PaperCenter>
            Pastikan Link yang diunggah dapat diakses publik
          </PaperCenter>
        </PaperRow>
      </Show>
    </Show>
  );
}
export default FolioFile;
