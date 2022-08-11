import { Link } from "@solidjs/router";

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
      <div className="flex items-center justify-between px-4 border-b space-x-4 py-3">
        <div className="px-4">
          <h1 className="font-semibold text-3xl">Mahafolio</h1>
        </div>
        <div className="w-full">
          <input type="text" placeholder="Pencarian" className="px-4 py-4 border w-full outline-none rounded-lg" />
        </div>
        <div className="px-4 flex space-x-8 items-center">
          <Link href="#" className="font-semibold text-xl">
            Login
          </Link>
          <button className="border p-4 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
