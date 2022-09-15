import { useNavigate } from "@solidjs/router";
import { useAuthContext } from "../hooks/useAuthContext";

import ButtonAccent from "../components/form/buttonaccent";
import FolioPublish from "../components/folio/foliopublish";
import Loading from "../components/loading";
import ErrorDisplay from "../components/error";

function Folios() {
  const [user] = useAuthContext();
  const navigate = useNavigate();

  return (
    <section>
      <Show when={user()} fallback={<Loading />}>
        <Show when={user().mhs} fallback={<ErrorDisplay err={"503 - Akses Ilegal"} />}>
          <div className="flex justify-end mb-6">
            <ButtonAccent title={"Kembali"} wrapperStyle={"mt-8"} action={() => navigate(-1)} />
          </div>
          <div className="grid grid-cols-12 mb-6">
            <div className="col-start-1 col-end-13">
              <FolioPublish data={false} authorId={user().mhs._id} />
            </div>
          </div>
        </Show>
      </Show>
    </section>
  );
}
export default Folios;
