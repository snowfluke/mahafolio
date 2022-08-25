import { Link } from "@solidjs/router";
import { createSignal, Show } from "solid-js";
import ActionButton from "../components/form/actionbutton";
import Button from "../components/form/button";
import Input from "../components/form/input";
import LoginCard from "../components/login/logincard";
import fetcher from "../utils/fetcher";
import ModalCard from "../components/modal/modalcard";

import { loginSchema } from "../validations";

const [login, setLogin] = createSignal(true);
const [modal, setModal] = createSignal(true);
const [error, setError] = createSignal(false);

function Login() {
  return (
    <section>
      <Show when={login()} fallback={<RegisterDisplay />}>
        <LoginDisplay />
      </Show>

      {/* <ModalCard /> */}
    </section>
  );
}

export default Login;

function LoginDisplay() {
  return (
    <LoginCard title={"Masuk"}>
      <form onSubmit={handleLogin}>
        <Input type="email" name="email" placeholder="Masukkan email" />
        <Input
          type="password"
          name="password"
          placeholder="Masukkan kata sandi"
        />
        <ActionButton title="Lupa Kata Sandi?" action={toggleModal} />
        <Show when={error()}>
          <div className="bg-red-100 border[1px] border-red-500 p-2 text-red-500 text-sm rounded-md">
            {error()}
          </div>
        </Show>
        <Button title={"Masuk"} />
      </form>
      <span className="w-full text-center inline-block">
        Belum terdaftar?{" "}
        <ActionButton
          title={"Daftar"}
          onClick={toggleLogin}
          className="font-semibold underline underline-offset-4"
        />
      </span>
    </LoginCard>
  );
}

function RegisterDisplay() {
  return (
    <LoginCard title={"Daftar"}>
      <form>
        <Input type="email" name="email" placeholder="Masukkan email" />
        <Input
          type="password"
          name="password"
          placeholder="Masukkan kata sandi"
        />
        <Input
          type="password"
          name="password"
          placeholder="Konfirmasi kata sandi"
        />
        <Button title={"Daftar"} />
      </form>
      <span className="w-full text-center inline-block">
        Sudah terdaftar?{" "}
        <ActionButton
          title={"Masuk"}
          onClick={toggleLogin}
          className="font-semibold underline underline-offset-4"
        />
      </span>
    </LoginCard>
  );
}

async function handleLogin(e) {
  e.preventDefault();
  setError(false);

  let formData = {
    email: e.target.email.value,
    password: e.target.password.value,
  };

  try {
    await loginSchema.validate(formData);
    const res = await fetcher("/api/mahasiswa/signin", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.error) {
      setError(res.error);
    }
  } catch (error) {
    setError(error.errors[0]);
  }
}

function toggleLogin() {
  setLogin(!login());
}

function toggleModal() {
  setModal(!modal());
}
