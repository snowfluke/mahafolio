function HeroEmail(props) {
  return (
    <div className="flex justify-end items-center responsive-text">
      <Show when={props.edit} fallback={<span>{props.email}</span>}>
        <div className="flex-[0.5] overflow-x-hidden flex justify-end items-center">
          <input
            type="email"
            maxLength={45}
            name="email"
            value={props.email}
            class="border-b-2 border-green bg-transparent w-full text-right"
          />
        </div>
      </Show>
    </div>
  );
}
export default HeroEmail;
