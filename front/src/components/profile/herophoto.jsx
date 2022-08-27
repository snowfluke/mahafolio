function HeroPhoto({ photo }) {
  return (
    <div className="flex-[0.7] flex space-x-6 justify-end">
      <div
        class="bg-cover bg-center h-30 block flex-1"
        style={photo ? photo : `background-image: url(/src/assets/profile.png)`}
      ></div>
      <div className="w-32">
        <img
          src={photo ? photo : "/src/assets/profile.png"}
          alt="Profil"
          className="w-32"
        />
      </div>
    </div>
  );
}
export default HeroPhoto;
