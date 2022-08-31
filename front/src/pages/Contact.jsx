import Paragraph from "../components/paragraph";
import StaticPages from "../components/staticpages";

function Contact() {
  return (
    <StaticPages title="Kontak Mahafolio">
      <Paragraph>
        Kendala dalam pengoperasian Mahafolio bisa disampaikan langsung kepada
        Admin Mahafolio di admin@mahafolio.web.app;; Mahafolio dikembangkan oleh
        dua mahasiswa STMIK Komputama Majenang, untuk hal-hal teknis
        pengembangan situs bisa menghubungi:
      </Paragraph>
      <ul>
        <li className="hover:underline">
          <a href="https://github.com/snowfluke" target="_blank">
            Awal Ariansyah
          </a>{" "}
        </li>
      </ul>
      <ul>
        <li className="hover:underline">
          <a href="https://github.com/wilisetiawan" target="_blank">
            Willy Setiawan
          </a>
        </li>
      </ul>
    </StaticPages>
  );
}
export default Contact;
