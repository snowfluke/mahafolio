import { Link } from "@solidjs/router";

function Landing() {
  return (
    <section className="p-4 my-4 space-y-8 w-[90%] mx-auto">
      <div className="space-y-4 text-center m-auto w-full md:w-1/2">
        <h1 className="text-4xl font-semibold">Mahafolio</h1>
        <h2 className="text-2xl">Kertas Digital Mahasiswa</h2>
        <p className="pb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi labore non facere sit recusandae inventore expedita, suscipit vel quisquam corporis?</p>

        <Link href="/login" className="inline-block border-2 border-sky-500 text-sky-500 font-semibold px-4 py-2 rounded-lg">
          Buat Portofolio
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2 border px-4 py-6 rounded-lg">
          <h2 className="font-semibold">Lorem</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quidem totam repellat amet, eius sed!</p>
        </div>
        <div className="space-y-2 border px-4 py-6 rounded-lg">
          <h2 className="font-semibold">Lorem</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quidem totam repellat amet, eius sed!</p>
        </div>
        <div className="space-y-2 border px-4 py-6 rounded-lg">
          <h2 className="font-semibold">Lorem</h2>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis quidem totam repellat amet, eius sed!</p>
        </div>
      </div>
    </section>
  );
}
export default Landing;
