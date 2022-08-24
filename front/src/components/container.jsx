function Container({ children }) {
  return (
    <div className="w-[85%] grid my-20 min-h-screen mx-auto space-y-5">
      {children}
    </div>
  );
}

export default Container;
