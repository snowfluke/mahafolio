import { createSignal, onMount } from "solid-js";
import { useSignin } from "../hooks/useSignin";
import { useSignup } from "../hooks/useSignup";

import ActionButton from "../components/form/actionbutton";
import Button from "../components/form/button";
import ErrorIndicator from "../components/form/errorindicator";
import Input from "../components/form/input";

import Loading from "../components/loading";
import LoginCard from "../components/login/logincard";
import { useModal } from "../hooks/useModal";
import { useNotif } from "../hooks/useNotif";
import fetcher from "../utils/fetcher";

const [login, setLogin] = createSignal(true);

function Login() {
  onMount(() => {
    document.title = `Mahafolio - Bergabung bersama kami`;
  });

  return (
    <section>
      <Show when={login()} fallback={<RegisterDisplay />}>
        <LoginDisplay />
      </Show>
    </section>
  );
}

export default Login;

const fetchForgot = async (email) =>
  await fetcher(encodeURI(`/api/mahasiswa/forgot-password`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

// Form Login

function LoginDisplay() {
  const { signin, isLoading, error } = useSignin();
  const { showModal, closeModal } = useModal();
  const { showNotif } = useNotif();

  const inputChildren = (
    <Input
      name={"email"}
      required={true}
      placeholder={"Masukkan email"}
      type={"email"}
    />
  );

  async function handleLogin(e) {
    e.preventDefault();
    let email = e.target.email.value,
      password = e.target.password.value;

    signin(email, password);
  }

  async function handleReset(e) {
    e.preventDefault();
    const email = e.target.email.value;
    if (!email) return;

    closeModal();
    showNotif("success", "Mengatur ulang kata sandi ...");

    try {
      const reset = await fetchForgot(email);
      if (reset.error) throw Error(reset.error);
      showNotif("success", `Tautan dikirimkan ke ${reset.receiver}`);
    } catch (error) {
      showNotif("error", error.message);
    }
  }

  function handleModal() {
    showModal({
      title: "Atur ulang kata sandi",
      description:
        "Kami akan mengirimkan email untuk mengatur ulang kata sandimu, pastikan email yang dimasukkan benar",
      actionName: "Kirim",
      ok: handleReset,
      children: inputChildren,
    });
  }

  return (
    <Show when={!isLoading()} fallback={<Loading />}>
      <LoginCard title={"Masuk"}>
        <form onSubmit={handleLogin}>
          <Input type="email" name="email" placeholder="Masukkan email" />
          <Input
            type="password"
            name="password"
            placeholder="Masukkan kata sandi"
          />

          <span className="w-full text-right inline-block">
            <ActionButton title="Atur ulang kata sandi" action={handleModal} />
          </span>
          <Show when={error()}>
            <ErrorIndicator message={error()} />
          </Show>
          <Button title={"Masuk"} />
        </form>
        <span className="w-full text-center inline-block">
          Belum terdaftar?{" "}
          <ActionButton
            title={"Daftar"}
            action={toggleLogin}
            extend="font-semibold decoration-2"
          />
        </span>
      </LoginCard>
    </Show>
  );
}

// Form register

function RegisterDisplay() {
  const { signup, isLoading, error } = useSignup();
  const { showNotif } = useNotif();

  async function handleRegister(e) {
    e.preventDefault();
    showNotif("success", "Mendaftar...");
    let email = e.target.email.value,
      password = e.target.password.value,
      confirm = e.target.confirm.value;

    signup(email, password, confirm);
  }
  return (
    <Show when={!isLoading()} fallback={<Loading />}>
      <LoginCard title={"Daftar"}>
        <form onSubmit={handleRegister}>
          <Input type="email" name="email" placeholder="Masukkan email" />
          <Input
            type="password"
            name="password"
            placeholder="Masukkan kata sandi"
          />
          <Input
            type="password"
            name="confirm"
            placeholder="Masukkan ulang kata sandi"
          />
          <Show when={error()}>
            <ErrorIndicator message={error()} />
          </Show>
          <Button title={"Daftar"} />
        </form>
        <span className="w-full text-center inline-block">
          Sudah terdaftar?{" "}
          <ActionButton
            title={"Masuk"}
            action={toggleLogin}
            extend="font-semibold decoration-2"
          />
        </span>
      </LoginCard>
    </Show>
  );
}

// Toggler

function toggleLogin() {
  setLogin(!login());
}
