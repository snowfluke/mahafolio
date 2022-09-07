import { createEffect, createSignal } from "solid-js";
import ErrorIndicator from "../form/errorindicator";
import imgSrc from "../../assets/profile.png";
import Loading from "../loading";

function HeroPhoto(props) {
  const [uploading, setUploading] = createSignal(false);
  const [error, setError] = createSignal(false);
  const [tag, setTag] = createSignal();
  const [tempPhoto, setTempPhoto] = createSignal("");

  createEffect(() => {
    if (props.edit !== true) setTempPhoto("");
  });

  createEffect(() => {
    function renderImageTag(src) {
      if (src == undefined) return;

      setTag("");
      const img = new Image();
      img.src = src;
      img.className = "w-32 h-32 object-cover";
      img
        .decode()
        .then(() => {
          setTag(img);
        })
        .catch(() => {
          img.src = imgSrc;
          setTag(img);
        });
    }

    renderImageTag(props.fetchUri);
  });

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

  return (
    <div className="lg:flex-[0.7] flex space-x-6 justify-end">
      <Show
        when={props.edit}
        fallback={
          <Show
            when={tag()}
            fallback={
              <div className="hidden md:flex items-center flex-1 justify-center">
                <Loading />
              </div>
            }
          >
            <div className="hidden md:block bg-cover bg-center h-32 flex-1 lg:border-4 lg:border-white" style={`background-image: url(${tag().src})`}></div>
          </Show>
        }
      ></Show>

      <div className="w-32 flex flex-col space-y-4 items-center justify-end">
        <Show
          when={props.edit}
          fallback={
            <Show when={tag()} fallback={<Loading />}>
              {tag()}
            </Show>
          }
        >
          <img src={tempPhoto() ? tempPhoto() : tag()?.src} alt="Profil" className="w-32 h-32 object-cover" />
          <div className="h-30 block flex-1">
            <Show when={error()}>
              <ErrorIndicator message={error()} />
            </Show>
            <Show when={!uploading()} fallback={<>Memproses...</>}>
              <input className="responsive-text" onChange={handleFileChange} type="file" accept="image/*" name="photo" />
              <input className="responsive-text" type={"hidden"} value={tempPhoto()} ref={props.ref} />
            </Show>
          </div>
        </Show>
      </div>
    </div>
  );
}
export default HeroPhoto;
