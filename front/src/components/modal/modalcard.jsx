import { useNotif } from "../../hooks/useNotif";
import ButtonClassic from "../form/buttonclassic";
import Input from "../form/input";
import Span from "../span";

function ModalCard(props) {
  const { showNotif } = useNotif();

  async function handleReset(e) {
    e.preventDefault();

    console.log(e.target.email.value);
    showNotif("success", e.target.email.value);
    props.close();
  }

  return (
    <>
      <div
        onClick={props.close}
        className="fixed z-10 top-0 bottom-0 left-0 w-full h-auto max-h-full bg-slate-800/50"
      ></div>
      <div
        className="overflow-y-auto overflow-x-hidden fixed w-full sm:w-[30%] md:w-[50%]
              top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 justify-center items-center flex z-50"
      >
        <div className="relative p-4 w-full">
          <div className="relative bg-white shadow-md py-14 px-4 space-y-4">
            <h3 className="text-xl font-semibold text-center">
              Atur ulang kata sandi
            </h3>
            <div className="px-4 space-y-4">
              <Span
                text={
                  "Kami akan mengirimkan email untuk mengatur ulang kata sandimu, pastikan email yang dimasukkan benar"
                }
              />
              <form onSubmit={handleReset}>
                <div className="space-y-1">
                  <Input
                    name={"email"}
                    required={true}
                    placeholder={"Masukkan email"}
                    type={"email"}
                  />
                </div>

                <div className="flex flex-col gap-2 justify-end lg:flex-row xl:flex-row mt-4">
                  <ButtonClassic title={"Kirim"} />
                  <ButtonClassic
                    title={"Tutup"}
                    alter={true}
                    action={(e) => {
                      e.preventDefault();
                      props.close();
                    }}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ModalCard;
