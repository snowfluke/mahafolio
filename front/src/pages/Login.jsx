import { Link } from "@solidjs/router";
import { createSignal, Show } from "solid-js";

function Login() {
  const [login, setLogin] = createSignal(true);
  const [modal, setModal] = createSignal(true);

  return (
    <section>
      <div className="w-full sm:w-[60%] md:w-[50%] lg:w-[30%] mx-auto bg-white rounded-lg shadow-lg p-6 space-y-4">
        <Show when={login()}>
          <h1 className="text-center font-semibold text-xl mb-2">Login</h1>
          <input type="email" className="border-green/70 border px-4 py-2 w-full rounded-md outline-none" placeholder="Masukkan email" />
          <input type="password" className="border-green/70 border px-4 py-2 w-full rounded-md outline-none" placeholder="Masukkan password" />
          <button className="w-full text-right" type="button" data-modal-toggle="lupaPass" onClick={() => setModal(!modal())}>
            Lupa Password?
          </button>

          <button className="font-semibold w-full text-center bg-green text-white tracking-widest rounded-md py-2">Masuk</button>
          <span className="w-full text-center inline-block">
            Belum terdaftar?{" "}
            <button onClick={() => setLogin(!login())} className="font-semibold underline underline-offset-4">
              Daftar!
            </button>
          </span>

          <Show when={!modal()}>
            <div
              id="lupaPass"
              tabindex="-1"
              className="overflow-y-auto overflow-x-hidden fixed 
              top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-full justify-center items-center flex"
              aria-modal="true"
              role="dialog"
            >
              <div className="relative p-4 w-full max-w-md ">
                <div className="relative bg-white rounded-lg shadow-md py-14 px-4 space-y-4">
                  <h3 className="text-xl font-semibold text-center">Lupa Kata Sandi?</h3>
                  <p className="leading-relaxed text-center text-sm">Jangan khawatir! Mereset kata sandi Anda sangat mudah. Ketikkan email akun Anda yang terdaftar di Mahafolio.</p>
                  <div className="px-4 space-y-4">
                    <div className="space-y-1">
                      <label htmlFor="email" className="font-semibold font-sm">
                        Email
                      </label>
                      <input type="email" className="border-green/70 border px-4 py-2 w-full rounded-md outline-none" placeholder="Masukkan email Anda" />
                    </div>

                    <button className="font-semibold w-full text-center bg-green text-white tracking-widest rounded-md py-2">Kirim</button>
                    <span className="w-full text-center inline-block">
                      Ingat kata sandi Anda?{" "}
                      <button onClick={() => setModal(!modal())} className="font-semibold underline underline-offset-4">
                        Coba Login!
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Show>
        </Show>

        <Show when={!login()}>
          <h1 className="text-center font-semibold text-xl mb-2">Register</h1>
          <input type="email" className="border border-green/70 px-4 py-2 w-full rounded-md outline-none" placeholder="Masukkan email" />
          <input type="password" className="border border-green/70 px-4 py-2 w-full rounded-md outline-none" placeholder="Masukkan password" />
          <input type="password" className="border border-green/70 px-4 py-2 w-full rounded-md outline-none" placeholder="Konfirmasi password" />
          <button className="font-semibold w-full text-center bg-green text-white tracking-widest rounded-md py-2">Daftar</button>
          <span className="w-full text-center inline-block">
            Sudah terdaftar?{" "}
            <button onClick={() => setLogin(!login())} className="font-semibold underline underline-offset-4">
              Login
            </button>
          </span>
        </Show>
      </div>
    </section>
  );
}

export default Login;
