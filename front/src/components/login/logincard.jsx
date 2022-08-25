import CardContainer from "./cardcontainer";

function LoginCard({ title, children }) {
  return (
    <CardContainer>
      <h1 className="text-center font-semibold text-xl mb-2">{title}</h1>
      {children}
    </CardContainer>
  );
}
export default LoginCard;
