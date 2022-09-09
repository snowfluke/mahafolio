import ButtonClassic from "../form/buttonclassic";
import Span from "../span";

function ModalCard(props) {
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
            <h3 className="text-xl font-semibold text-center">{props.title}</h3>
            <div className="px-4 space-y-4">
              <Span text={props.description} />
              <form onSubmit={props.ok}>
                <div className="space-y-1">{props.children}</div>

                <div className="flex flex-col gap-2 justify-end lg:flex-row xl:flex-row mt-4">
                  <ButtonClassic title={props.actionName} />
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
