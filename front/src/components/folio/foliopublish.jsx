import { createSignal } from "solid-js";
import ErrorIndicator from "../form/errorindicator";
import FolioView from "./folioview";

function FolioPublish(props) {
  const [file, setFile] = createSignal(false);
  const [error, setError] = createSignal(false);
  const [loading, setLoading] = createSignal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true);

    try {
      let fields = {
        title: e.target.title.value,
        description: e.target.description.value,
        subject: e.target.subject.value,
        semester: e.target.semester.value,
        type: e.target.type.value,
        file: "",
        url: "",
      };

      let url = e.target.url?.value;

      if (!url && !file()) {
        setLoading(false);
        return setError("Berkas atau Link perlu diisi!");
      }

      if (file()) {
        if (file().size > 2000000) {
          setLoading(false);
          setFile(false);
          return setError("Ukuran maksimal berkas 2MB!");
        }
      }

      if (url && !file()) fields.url = url;

      const data = new FormData();
      data.append("title", fields.title);
      data.append("description", fields.description);
      data.append("subject", fields.subject);
      data.append("semester", fields.semester);
      data.append("type", fields.type);
      data.append("url", fields.url);
      data.append("file", fields.file);
      data.append("author", props.canEdit);

      console.log();
    } catch (error) {
      if (error.name == "ValidationError") {
        return setError(error.errors[0]);
      }
    }
  };

  return (
    <Show
      when={props.canEdit}
      fallback={<FolioView data={props.data} edit={false} />}
    >
      <form id="folio" onSubmit={handleSubmit} encType="multipart/form-data">
        <Show when={error()}>
          <ErrorIndicator message={error()} />
        </Show>
        <FolioView
          data={props.data || false}
          edit={props.canEdit}
          setFile={setFile}
        />
      </form>
    </Show>
  );
}
export default FolioPublish;
