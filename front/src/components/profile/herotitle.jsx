function HeroTitle(props) {
  return (
    <div className="flex flex-col flex-[0.3] responsive-text">
      <span className="text-green font-semibold text-4xl">
        {props.score}pts
      </span>

      <Show
        when={props.edit}
        fallback={
          <span className="text-green font-semibold text-xl">{props.name}</span>
        }
      >
        <input
          type="text"
          value={props.name}
          ref={props.ref}
          name="name"
          class="border-b-2 text-green font-semibold text-xl border-green bg-transparent w-full"
        />
      </Show>
    </div>
  );
}
export default HeroTitle;
