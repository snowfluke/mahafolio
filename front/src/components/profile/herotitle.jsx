function HeroTitle({ score, name }) {
  return (
    <div className="flex flex-col md:w-[25%] responsive-text">
      <span className="text-green font-semibold text-4xl">{score}pts</span>
      <span className="text-green font-semibold text-xl">{name}</span>
    </div>
  );
}
export default HeroTitle;
