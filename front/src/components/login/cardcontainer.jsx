function CardContainer({ children }) {
  return (
    <div className="w-full sm:w-[60%] md:w-[50%] lg:w-[30%] mx-auto bg-white rounded-lg shadow-lg p-6 space-y-4">
      {children}
    </div>
  );
}
export default CardContainer;
