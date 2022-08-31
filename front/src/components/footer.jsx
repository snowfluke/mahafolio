import { Link } from "@solidjs/router";

function Footer() {
  return (
    <>
      <footer className="footer-class">
        <span className="footer-title">
          <Link href="/">© Mahafolio 2022</Link>
        </span>
        <ul className="footer-nav">
          <li className="footer-list">
            <Link href="/tentang">Tentang</Link>
          </li>
          <li className="footer-list">
            <Link href="/kontak">Kontak</Link>
          </li>
          <li className="footer-list">
            <Link href="/kebijakan">Kebijakan</Link>
          </li>
        </ul>
      </footer>
    </>
  );
}

export default Footer;
