function ModalCard() {
  return (
    <div
      className="overflow-y-auto overflow-x-hidden fixed 
              top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-full justify-center items-center flex"
      aria-modal="true"
      role="dialog"
    >
      <div className="relative p-4 w-full max-w-md ">
        <div className="relative bg-white shadow-md py-14 px-4 space-y-4">
          <h3 className="text-xl font-semibold text-center">
            Lupa Kata Sandi?
          </h3>
          <p className="leading-relaxed text-center text-sm">
            Jangan khawatir! Mereset kata sandi Anda sangat mudah. Ketikkan
            email akun Anda yang terdaftar di Mahafolio.
          </p>
          <div className="px-4 space-y-4">
            <div className="space-y-1">
              <label htmlFor="email" className="font-semibold font-sm">
                Email
              </label>
              <input
                type="email"
                className="border-green/70 border px-4 py-2 w-full outline-none"
                placeholder="Masukkan email Anda"
              />
            </div>

            <button className="font-semibold w-full text-center bg-green text-white tracking-widest py-2">
              Kirim
            </button>
            <span className="w-full text-center inline-block">
              Ingat kata sandi Anda?{" "}
              <button
                onClick={() => setModal(!modal())}
                className="font-semibold underline underline-offset-4"
              >
                Coba Login!
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ModalCard;
