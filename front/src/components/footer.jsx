import { Link } from "@solidjs/router";

function Footer() {
  return (
    <footer className="footer-class">
      <span className="footer-title">
        <Link href="#">© Mahafolio 2022</Link>
      </span>
      <ul className="footer-nav">
        <li className="footer-list">
          <Link href="#">Tentang</Link>
        </li>
        <li className="footer-list">
          <Link href="#">Kontak</Link>
        </li>
        <li className="footer-list">
          <Link href="#">Kebijakan Penggunaan</Link>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
