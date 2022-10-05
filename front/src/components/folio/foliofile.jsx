import { createSignal } from "solid-js";
import { EMPTY_STR } from "../../utils/constant";
import { elipsis } from "../../utils/string";
import Dropdown from "../form/dropdown";
import PaperCenter from "../paper/papercenter";
import PaperGridLink from "../paper/papergridlink";
import PaperLeft from "../paper/paperleft";
import PaperRow from "../paper/paperrow";
import FolioInput from "./folioinput";

function FolioFile(props) {
  const [link, setLink] = createSignal(true);

  return (
    <Show
      when={props.edit}
      fallback={
        <PaperGridLink link={props.url}>
          <PaperLeft content={"→"} />
          <PaperCenter content={elipsis(props.url)} />
        </PaperGridLink>
      }
    >
      <PaperRow>
        <PaperLeft content={EMPTY_STR} />
        <PaperCenter>
          <Dropdown
            items={[
              { value: "url", name: "Unggah link" },
              { value: "file", name: "Unggah berkas" },
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
                <input
                  type={"file"}
                  name="file"
                  onChange={(e) => props.setFile(e.target.files[0])}
                />
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
            <FolioInput
              name="url"
              value={props.url}
              placeholder={props.placeholder}
            />
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
