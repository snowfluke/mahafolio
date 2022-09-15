import { useNavigate } from "@solidjs/router";
import { children, createSignal } from "solid-js";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useModal } from "../../hooks/useModal";
import { useNotif } from "../../hooks/useNotif";
import fetcher from "../../utils/fetcher";
import { refresher, titleCase, wordsCase } from "../../utils/string";
import { folioSchema } from "../../validations";

import ErrorIndicator from "../form/errorindicator";
import FolioView from "./folioview";

async function postFolio(data, token) {
  return await fetcher("/api/folio", {
    method: "POST",
    body: data,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

async function patchFolio(id, data, token) {
  return await fetcher("/api/folio/" + id, {
    method: "PATCH",
    body: data,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
}

const deleteFolio = async (id, token) =>
  await fetcher("/api/folio/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

function FolioPublish(props) {
  const [user] = useAuthContext();
  const navigate = useNavigate();
  const [file, setFile] = createSignal(false);
  const [error, setError] = createSignal(false);
  const [loading, setLoading] = createSignal(false);
  const [editing, setEditing] = createSignal(false);

  const { showNotif } = useNotif();
  const { showModal, closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    if (!user().mhs) return setError("Akses ilegal!");

    try {
      let fields = {
        title: titleCase(e.target.title.value),
        description: titleCase(e.target.description?.value || ""),
        subject: wordsCase(e.target.subject.value),
        semester: e.target.semester?.value || 0,
        type: e.target.type.value,
        url: e.target.url?.value || "",
        file: "",
      };
      setLoading(true);

      await folioSchema.validate(fields);

      if (!fields.url && !file()) {
        setLoading(false);
        return setError("Berkas atau Link perlu diisi!");
      }

      if (file()) {
        if (file().size > 2000000) {
          setLoading(false);
          setFile(false);
          return setError("Ukuran maksimal berkas 2MB!");
        }
        fields.file = file();
        fields.url = "";
      }

      let res;
      const data = new FormData();

      for (const key of Object.keys(fields)) {
        if (fields[key] !== "") {
          data.append(key, fields[key]);
        }
      }

      data.append("author", user().mhs._id);

      if (props.data) {
        res = await patchFolio(props.data._id, data, user().mhs.token);
      }

      if (!props.data) {
        res = await postFolio(data, user().mhs.token);
      }

      setLoading(false);

      if (res.error) return setError(res.error);
      navigate("/folio/" + res._id + "?t=" + refresher(), { replace: true });

      showNotif("success", "Berhasil membuat folio");
    } catch (error) {
      setLoading(false);
      if (error.name == "ValidationError") {
        return setError(error.errors[0]);
      }
      setError(error.error);
    }
  };

  function confirmDelete(e) {
    e.preventDefault();

    showModal({
      title: "Apakah kamu yakin ingin menghapus folio?",
      description:
        "Folio akan dihapus beserta berkas yang diunggah ke dalam Google Drive (jika ada)",
      actionName: "Hapus",
      ok: handleDelete,
      children: "",
    });
  }

  async function handleDelete(e) {
    try {
      e.preventDefault();

      closeModal();
      setLoading(true);
      const deleted = await deleteFolio(props.data._id, user().mhs.token);

      showNotif("success", "Berhasil menghapus folio");
      navigate("/mahasiswa", { replace: true });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <Show when={user().mhs && user().mhs._id == props.authorId} fallback={<FolioView data={props.data} canEdit={false} />}>
      <form id="folio" onSubmit={handleSubmit} encType="multipart/form-data">
        <FolioView
          data={props.data}
          canEdit={true}
          editing={props.data ? editing() : true}
          setEditing={() => setEditing(!editing())}
          setFile={setFile}
          handleDelete={confirmDelete}
          loading={loading()}
          author={props.authorId}
        />
        <Show when={error()}>
          <ErrorIndicator message={error()} />
        </Show>
      </form>
    </Show>
  );
}
export default FolioPublish;
