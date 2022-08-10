function Header() {
  return (
    <header>
      <div className="flex justify-between items-center p-4 border-b">
        <div className="flex items-center space-x-4">
          <img src="src/assets/logo_stmik.png" alt="Logo STMIK Komputama" className="w-16" />
          <span className="font-semibold text-xl">STMIK Komputama Majenang</span>
        </div>
        <div className="font-semibold text-sm">
          <p>STMIK Komputama Majenang</p>
          <p>Khoirunnas anfauhum linnas</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 border-b space-x-8 py-2">
        <div className="py-4">
          <h1 className="font-semibold text-3xl">Mahafolio</h1>
        </div>
        <div className="w-full">
          <input type="text" placeholder="Pencarian" className="px-4 py-4 border w-full outline-none rounded-lg" />
        </div>
        <div>
          <a href="#" className="font-semibold text-xl">
            Login
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
