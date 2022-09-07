function PaperContainer({ children }) {
  return (
    <table className="table-fixed overflow-x-auto my-4 w-full responsive-text ">
      <tbody>{children}</tbody>
    </table>
  );
}
export default PaperContainer;
