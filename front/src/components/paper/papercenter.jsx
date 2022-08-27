function PaperCenter({ content, emoji = false, index = false }) {
  return (
    <>
      <td className="pl-3 md:w-[80%] lg:w-[85%] w-[65%] hover:bg-green hover:text-white">
        {content}
        <Show when={emoji && index == 0}>
          <span className="ml-2">👑</span>
        </Show>
      </td>
    </>
  );
}
export default PaperCenter;
