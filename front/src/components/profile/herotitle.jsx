function HeroTitle(props) {
  return (
    <div className="flex flex-col lg:flex-[0.3] responsive-text">
      <span className="text-green font-semibold text-3xl lg:text-4xl">{props.score}pts</span>

      <Show
        when={props.edit}
        fallback={
          <>
            <span className="text-green font-semibold text-base md:text-xl lg:text-2xl">{props.name}</span>
            <span className="text-green font-semibold text-base md:text-xl lg:text-2xl">{props.nim}</span>
          </>
        }
      >
        <input type="text" value={props.name} spellCheck={false} maxLength={25} name="name" class="border-b-2 text-green font-semibold text-base lg:text-xl border-green bg-transparent w-full" />
        <input type="text" value={props.nim} spellCheck={false} maxLength={12} name="nim" class="border-b-2 text-green font-semibold text-base lg:text-xl border-green bg-transparent w-full" />
      </Show>
    </div>
  );
}
export default HeroTitle;
