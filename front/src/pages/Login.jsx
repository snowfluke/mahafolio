import { Link } from "@solidjs/router";
import { createSignal, Show } from "solid-js";

function Login() {
  const [login, setLogin] = createSignal(true);

  return (
    <section className="w-[30%] mx-auto border rounded-lg shadow-md p-6 space-y-4">
      <Show when={login()}>
        <h1 className="text-center font-semibold text-xl mb-2">Login</h1>
        <input type="email" className="border px-4 py-2 w-full rounded-md outline-none" placeholder="Masukkan email" />
        <input type="password" className="border px-4 py-2 w-full rounded-md outline-none" placeholder="Masukkan password" />
        <button className="w-full text-right" type="button" data-modal-toggle="popup-modal">
          Lupa Password?
        </button>

        <button className="font-semibold w-full text-center border-sky-500 border text-sky-500 rounded-md py-2">Masuk</button>
        <span className="w-full text-center inline-block">
          Belum terdaftar?{" "}
          <button onClick={() => setLogin(!login())} className="font-semibold underline underline-offset-4">
            Daftar!
          </button>
        </span>
      </Show>

      <Show when={!login()}>
        <h1 className="text-center font-semibold text-xl mb-2">Register</h1>
        <input type="email" className="border px-4 py-2 w-full rounded-md outline-none" placeholder="Masukkan email" />
        <input type="password" className="border px-4 py-2 w-full rounded-md outline-none" placeholder="Masukkan password" />
        <input type="password" className="border px-4 py-2 w-full rounded-md outline-none" placeholder="Konfirmasi password" />
        <button className="font-semibold w-full text-center border-sky-500 border text-sky-500 rounded-md py-2">Daftar</button>
        <span className="w-full text-center inline-block">
          Sudah terdaftar?{" "}
          <button onClick={() => setLogin(!login())} className="font-semibold underline underline-offset-4">
            Login
          </button>
        </span>
      </Show>
    </section>
  );
}

export default Login;
