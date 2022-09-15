function PaperRightAction(props) {
  return (
    <td
      onClick={props.action}
      className="cursor-pointer hover:bg-red-300 text-center lg:w-[10%] w-[20%]"
    >
      <span>{props.content}</span>
    </td>
  );
}
export default PaperRightAction;
