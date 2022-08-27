import { Link } from "@solidjs/router";

function Footer() {
  return (
    <footer className="p-4 text-center lg:flex lg:space-x-16">
      <span className="font-semibold text-green">
        <Link href="#">© Mahafolio 2022</Link>
      </span>
      <ul className="font-normal responsive-text lg:list-disc flex flex-col sm:flex-row justify-center sm:space-x-4 lg:space-x-8">
        <li className="cursor-pointer hover:underline hover:underline-offset-4">
          <Link href="#">Tentang</Link>
        </li>
        <li className="cursor-pointer hover:underline hover:underline-offset-4">
          <Link href="#">Kontak</Link>
        </li>
        <li className="cursor-pointer hover:underline hover:underline-offset-4">
          <Link href="#">Kebijakan Penggunaan</Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
