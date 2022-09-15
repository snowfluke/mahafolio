import { Link } from "@solidjs/router";
import logoSrc from "../assets/logo.png";
import logoStmik from "../assets/logo_stmik.png";

function Header() {
  return (
    <header>
      <div className="grid grid-cols-4 lg:grid-cols-12 justify-items-stretch select-none">
        <Link href="#" className="col-start-1 flex items-center justify-self-start">
          <img src={logoSrc} alt="Mahafolio" className="p-1 bg-white w-12 sm:w-16 h-12 sm:h-16" />
        </Link>
        <div className="col-start-2 col-span-2 lg:col-span-3 flex justify-self-center lg:justify-self-start items-center">
          <div className="flex flex-col text-center lg:text-left">
            <Link href="#" className="font-semibold text-xl text-green">
              Mahafolio
            </Link>
            <span className="responsive-text-xs">Simpan kemajuan kuliahmu!</span>
          </div>
        </div>
        <div className="col-start-4 lg:col-start-12 justify-self-end">
          <img src={logoStmik} alt="STMIK Komputama Majenang" className="p-1 bg-white w-12 sm:w-16 h-12 sm:h-16" />
        </div>
      </div>
    </header>
  );
}

export default Header;
