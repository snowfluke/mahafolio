import { createEffect, createSignal, onCleanup, onMount } from "solid-js";
import { BACKEND_URL } from "../../utils/constant";
import ErrorIndicator from "../form/errorindicator";
import Loading from "../loading";

function HeroPhoto(props) {
  const [uploading, setUploading] = createSignal(false);
  const [error, setError] = createSignal(false);
  const [tempPhoto, setTempPhoto] = createSignal("");
  const [photo, setPhoto] = createSignal();

  function handleFileChange(e) {
    setUploading(true);
    setError(false);
    let file = e.target.files[0];

    if (file.size > 250000) {
      setUploading(false);
      return setError("Ukuran foto maksimal 250KB!");
    }
    if (!/(?:jpg|jpeg|png)$/.test(file.type)) {
      setUploading(false);
      return setError("Format foto tidak didukung!");
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUploading(false);
      setTempPhoto(reader.result);
    };
  }

  const img = new Image();
  img.src = `${BACKEND_URL}/api/photo/${props.id}`;
  img.alt = "Profil";
  img.className = "w-32";
  img
    .decode()
    .then(() => {
      setPhoto(img);
    })
    .catch(() => {
      img.src = "/src/assets/profile.png";
      setPhoto(img);
    });

  return (
    <div className="flex-[0.7] flex space-x-6 justify-end">
      <Show
        when={props.edit}
        fallback={
          <Show fallback={<Loading />} when={photo()}>
            <div
              class="bg-cover bg-center h-30 block flex-1"
              style={`background-image: url(${photo().src})`}
            ></div>
          </Show>
        }
      >
        <div class=" h-30 block flex-1">
          <Show when={error()}>
            <ErrorIndicator message={error()} />
          </Show>
          <Show when={!uploading()} fallback={<>Memproses...</>}>
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              name="photo"
            />
            <input type={"hidden"} value={tempPhoto()} ref={props.ref} />
          </Show>
        </div>
      </Show>
      <div className="w-32">
        <Show
          when={props.edit}
          fallback={
            <Show when={photo()} fallback={<Loading />}>
              {photo()}
            </Show>
          }
        >
          <img
            src={tempPhoto().length ? tempPhoto() : photo()?.src}
            alt="Profil"
            className="w-32"
          />
        </Show>
      </div>
    </div>
  );
}
export default HeroPhoto;
