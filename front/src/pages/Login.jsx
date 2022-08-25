import { createSignal } from "solid-js";
import ActionButton from "../components/form/actionbutton";
import Button from "../components/form/button";
import ErrorIndicator from "../components/form/errorindicator";
import Input from "../components/form/input";
import LoginCard from "../components/login/logincard";
import { useSignin } from "../hooks/useSignin";
import { useSignup } from "../hooks/useSignup";

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

function LoginDisplay() {
  const { signin, isLoading, error } = useSignin();

  async function handleLogin(e) {
    e.preventDefault();
    let email = e.target.email.value,
      password = e.target.password.value;

    signin(email, password);
  }

  return (
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
            title="Lupa Kata Sandi?"
            action={() => console.log("Modal open")}
          />
        </span>
        <Show when={error()}>
          <ErrorIndicator message={error()} />
        </Show>
        <Button disabled={isLoading} title={"Masuk"} />
      </form>
      <span className="w-full text-center inline-block">
        Belum terdaftar?{" "}
        <ActionButton
          title={"Daftar"}
          action={toggleLogin}
          extend="font-semibold underline underline-offset-2"
        />
      </span>
    </LoginCard>
  );
}

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
        <Button disabled={isLoading} title={"Daftar"} />
      </form>
      <span className="w-full text-center inline-block">
        Sudah terdaftar?{" "}
        <ActionButton
          title={"Masuk"}
          action={toggleLogin}
          extend="font-semibold underline underline-offset-2"
        />
      </span>
    </LoginCard>
  );
}

function toggleLogin() {
  setLogin(!login());
}
