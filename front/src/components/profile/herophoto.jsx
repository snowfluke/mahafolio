function HeroPhoto({ photo }) {
  return (
    <>
      <div
        class="hidden md:block bg-cover bg-center md:w-[60%] h-30"
        style={photo ? photo : `background-image: url(/src/assets/profile.png)`}
      ></div>
      <div>
        <img
          src={photo ? photo : "/src/assets/profile.png"}
          alt="Profil"
          className="w-32"
        />
      </div>
    </>
  );
}
export default HeroPhoto;
