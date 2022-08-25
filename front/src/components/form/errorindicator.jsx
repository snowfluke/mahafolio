function ErrorIndicator(props) {
  return (
    <div className="bg-red-100 border[1px] border-red-500 p-2 text-red-500 text-sm rounded-md">
      {props.message}
    </div>
  );
}
export default ErrorIndicator;
