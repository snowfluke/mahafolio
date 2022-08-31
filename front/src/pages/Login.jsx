import { createSignal } from "solid-js";
import { useSignin } from "../hooks/useSignin";
import { useSignup } from "../hooks/useSignup";

import ActionButton from "../components/form/actionbutton";
import Button from "../components/form/button";
import ErrorIndicator from "../components/form/errorindicator";
import Input from "../components/form/input";

import Loading from "../components/loading";
import LoginCard from "../components/login/logincard";

const [login, setLogin] = createSignal(true);

function Login() {
  return (
    <section>
      <Show when={login()} fallback={<RegisterDisplay />}>
        <LoginDisplay />
      </Show>
    </section>
  );
}

export default Login;

// Form Login

function LoginDisplay() {
  const { signin, isLoading, error } = useSignin();

  async function handleLogin(e) {
    e.preventDefault();
    let email = e.target.email.value,
      password = e.target.password.value;

    signin(email, password);
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
            <ActionButton
              title="Lupa kata sandi?"
              action={() => console.log("Modal open")}
            />
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

  async function handleRegister(e) {
    e.preventDefault();
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
